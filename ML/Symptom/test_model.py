
from pathlib import Path
from collections import Counter
import joblib

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model"

model = joblib.load(MODEL_DIR / "symptom_rf_model.pkl")
symptoms = joblib.load(MODEL_DIR / "symptom_list.pkl")

print("Model loaded successfully!")
print("Model feature count:", model.n_features_in_)
print("Symptom list count:", len(symptoms))

duplicates = [
    name for name, count in Counter(symptoms).items()
    if count > 1
]
print("Duplicate symptoms:", duplicates)

if len(symptoms) != model.n_features_in_:
    raise ValueError(
        "Model aur symptom_list.pkl ke feature counts match nahi karte."
    )

if duplicates:
    raise ValueError(
        "Symptom list mein duplicates hain. Training features verify karein."
    )

print("Feature count check passed.")
print("First 10 features:", symptoms[:10])

