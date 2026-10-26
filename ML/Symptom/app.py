
from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os

app = Flask(__name__)

# Model paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(
    BASE_DIR, "model", "symptom_rf_model.pkl"
)
SYMPTOM_PATH = os.path.join(
    BASE_DIR, "model", "symptom_list.pkl"
)

# Load model once when the API starts
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model not found: {MODEL_PATH}")

if not os.path.exists(SYMPTOM_PATH):
    raise FileNotFoundError(f"Symptom list not found: {SYMPTOM_PATH}")

model = joblib.load(MODEL_PATH)
symptom_list = joblib.load(SYMPTOM_PATH)

# Check feature compatibility
if hasattr(model, "n_features_in_"):
    if model.n_features_in_ != len(symptom_list):
        raise ValueError(
            "Model features aur symptom list ki length match nahi karti."
        )


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "success",
        "message": "Disease Prediction API is running",
        "endpoints": {
            "health": "GET /",
            "symptoms": "GET /symptoms",
            "predict": "POST /predict"
        }
    }), 200


@app.route("/symptoms", methods=["GET"])
def get_symptoms():
    return jsonify({
        "total_symptoms": len(symptom_list),
        "symptoms": symptom_list
    }), 200


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "error": "Request body valid JSON object hona chahiye."
        }), 400

    symptoms = data.get("symptoms")

    if not isinstance(symptoms, list) or not symptoms:
        return jsonify({
            "error": "'symptoms' mein kam se kam ek symptom ki list dein."
        }), 400

    if not all(isinstance(s, str) and s.strip() for s in symptoms):
        return jsonify({
            "error": "Har symptom non-empty string hona chahiye."
        }), 400

    symptoms = [s.strip() for s in symptoms]

    if len(symptoms) != len(set(symptoms)):
        return jsonify({
            "error": "Duplicate symptoms allowed nahi hain."
        }), 400

    invalid_symptoms = [
        s for s in symptoms if s not in symptom_list
    ]

    if invalid_symptoms:
        return jsonify({
            "error": "Kuch symptoms model mein available nahi hain.",
            "invalid_symptoms": invalid_symptoms
        }), 400

    # Build input in the exact training feature order
    input_data = pd.DataFrame(
        [[1 if s in symptoms else 0 for s in symptom_list]],
        columns=symptom_list
    )

    # Prediction
    prediction = str(model.predict(input_data)[0])

    response = {
        "status": "success",
        "selected_symptoms": symptoms,
        "predicted_disease": prediction,
        "notice": (
            "Educational model output only; "
            "not a medical diagnosis."
        )
    }

    # Include top 3 model scores when available
    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(input_data)[0]
        top_indices = probabilities.argsort()[::-1][:3]

        response["top_predictions"] = [
            {
                "disease": str(model.classes_[i]),
                "model_score_percent": round(
                    float(probabilities[i]) * 100, 2
                )
            }
            for i in top_indices
        ]

    return jsonify(response), 200


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )

