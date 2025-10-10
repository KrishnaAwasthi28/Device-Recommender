import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class DeviceRecommender:
    def __init__(self, dataset_path=None):
        self.df = pd.read_csv(dataset_path)
        self.df.fillna('', inplace=True)

        # ✅ Use your actual column names
        brand_col = 'brand_preference' if 'brand_preference' in self.df.columns else ''
        screen_col = 'screen_size_pref' if 'screen_size_pref' in self.df.columns else ''
        budget_col = 'budget_range' if 'budget_range' in self.df.columns else ''

        # ✅ Combine important columns into one feature string
        combined_cols = ['device_type', 'use_case']
        if brand_col:
            combined_cols.append(brand_col)
        if screen_col:
            combined_cols.append(screen_col)
        if budget_col:
            combined_cols.append(budget_col)

        self.df['combined_features'] = self.df[combined_cols].astype(str).agg(' '.join, axis=1)

        # Fit TF-IDF on all devices
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.feature_matrix = self.vectorizer.fit_transform(self.df['combined_features'])

    def _parse_budget_range(self, budget_str):
        """
        Converts '40000-50000' or '100000 above' to numeric min/max.
        """
        try:
            parts = budget_str.split('-')
            if len(parts) == 2:
                return int(parts[0]), int(parts[1])
            elif 'above' in budget_str:
                num = int(''.join([ch for ch in budget_str if ch.isdigit()]))
                return num, float('inf')
            else:
                return 0, 0
        except:
            return 0, 0

    def recommend(self, user_input, top_n=5):
        device_type = user_input.get('device_type', '').strip().lower()
        use_case = user_input.get('use_case', '').strip().lower()
        min_budget = user_input.get('min_budget', 0)
        max_budget = user_input.get('max_budget', 999999)
        brand_pref = user_input.get('brand_preference', '').strip().lower()
        screen_pref = user_input.get('screen_size_pref', '').strip().lower()

        # ✅ Filter strictly by device type
        filtered_df = self.df[self.df['device_type'].str.lower() == device_type]
        if filtered_df.empty:
            filtered_df = self.df.copy()  # fallback if no match found

        # ✅ Progressive budget relaxation
        step = 5000
        found_devices = pd.DataFrame()

        while found_devices.shape[0] < top_n and min_budget >= 0:
            found_devices = self._filter_by_budget(filtered_df, min_budget, max_budget)
            if found_devices.shape[0] >= top_n:
                break
            min_budget = max(0, min_budget - step)
            max_budget += step

        # ✅ Build query string for similarity check
        query_text = f"{device_type} {use_case} {brand_pref} {screen_pref} {min_budget}-{max_budget}"
        query_vec = self.vectorizer.transform([query_text])

        similarity = cosine_similarity(query_vec, self.feature_matrix)[0]
        self.df['similarity_score'] = similarity

        valid_indices = found_devices.index
        ranked = self.df.loc[valid_indices].sort_values(by='similarity_score', ascending=False).head(top_n)

        display_cols = [col for col in [
            'chosen_device', 'device_type', 'use_case',
            'brand_preference', 'budget_range', 'screen_size_pref', 'similarity_score'
        ] if col in self.df.columns]

        return ranked[display_cols]

    def _filter_by_budget(self, df, min_budget, max_budget):
        """
        Select rows whose entire budget range lies within [min_budget, max_budget].
        """
        valid_rows = []
        for idx, row in df.iterrows():
            low, high = self._parse_budget_range(row.get('budget_range', '0-0'))
            if low >= min_budget and high <= max_budget:
                valid_rows.append(idx)
        return df.loc[valid_rows]
