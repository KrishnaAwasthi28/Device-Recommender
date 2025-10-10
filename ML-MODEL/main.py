import sys
import json
import pandas as pd
from recommendation_system import DeviceRecommender

def main():
    try:
        # Read the entire stdin input
        raw_input = sys.stdin.read().strip()
        if not raw_input:
            print(json.dumps({"error": "No input received"}))
            sys.exit(1)

        # Parse input JSON
        input_data = json.loads(raw_input)

        # Initialize recommender
        recommender = DeviceRecommender(
            dataset_path="C:/Users/Krishna/Downloads/device_dataset.csv"
        )

        # Get top 5 recommendations
        recommendations = recommender.recommend(input_data, top_n=5)

        # Prepare JSON output
        output = []
        for _, row in recommendations.iterrows():
            output.append({
                "device_name": row.get("chosen_device", ""),
                "brand": row.get("brand_preference", "")
            })

        # Print output as JSON (flush ensures Java can read it)
        print(json.dumps(output))
        sys.stdout.flush()

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.stdout.flush()

if __name__ == "__main__":
    main()
