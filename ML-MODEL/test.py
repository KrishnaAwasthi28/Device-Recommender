from recommendation_system import DeviceRecommender
import pandas as pd
# Option 1: CSV
recommender = DeviceRecommender(dataset_path="C:/Users/Krishna/Downloads/device_dataset.csv")
user_input = {
    'device_type': 'Mobile',
    'use_case': 'Business',
    'min_budget': 40000,
    'max_budget': 50000,
    'brand_preference': '',
    'screen_size_pref': ''
}

recommendations = recommender.recommend(user_input, top_n=5)
print(recommendations)
