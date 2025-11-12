import sys
import json
import os
import traceback
from recommendation_system import DeviceRecommender

def main():
    try:
        raw_input = sys.stdin.read().strip()
        if not raw_input:
            print(json.dumps({"error": "No input received"}))
            sys.exit(1)

        input_data = json.loads(raw_input)

        # Debugging
        print("[PYTHON] Input received:", input_data, file=sys.stderr)

        # Dataset path (relative)
        dataset_path = os.path.join(os.path.dirname(__file__), "device_dataset.csv")

        # Debugging
        if not os.path.exists(dataset_path):
            print(f"[PYTHON] Dataset not found at: {dataset_path}", file=sys.stderr)
            sys.exit(1)

        recommender = DeviceRecommender(dataset_path=dataset_path)
        recommendations = recommender.recommend(input_data, top_n=5)

        output = []
        for _, row in recommendations.iterrows():
            output.append({
                "device_name": row.get("chosen_device", ""),
                "brand": row.get("brand_preference", "")
            })

        print(json.dumps(output))
        sys.stdout.flush()
        sys.exit(0)

    except Exception as e:
        print("[PYTHON ERROR]", traceback.format_exc(), file=sys.stderr)
        print(json.dumps({"error": str(e)}))
        sys.stdout.flush()
        sys.exit(1)

if __name__ == "__main__":
    main()
