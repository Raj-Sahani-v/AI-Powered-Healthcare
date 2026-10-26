
// const diseaseSpecialty = {
//   "Fungal infection": "Dermatologist",
//   "Acne": "Dermatologist",
//   "Drug Reaction": "Dermatologist",
//   "Psoriasis": "Dermatologist",
//   "Impetigo": "Dermatologist",

//   "GERD": "Gastroenterologist",
//   "Peptic ulcer disease": "Gastroenterologist",
//   "Gastroenteritis": "Gastroenterologist",
//   "Jaundice": "Gastroenterologist",
//   "Chronic cholestasis": "Gastroenterologist",

//   "Migraine": "Neurologist",
//   "Paralysis (brain hemorrhage)": "Neurologist",

//   "Arthritis": "Rheumatologist",
//   "Osteoarthritis": "Orthopedic",

//   "Heart attack": "Cardiologist",
//   "Hypertension": "Cardiologist",

//   "Urinary tract infection": "Urologist",
//   "Diabetes": "Endocrinologist",

//   "Common Cold": "General Physician",
//   "Pneumonia": "Pulmonologist",
//   "Bronchial Asthma": "Pulmonologist",

//   "Dengue": "General Physician",
//   "Malaria": "General Physician",
//   "Typhoid": "General Physician",
//   "AIDS": "Infectious Disease Specialist"
// };

const recommends= {
  "AIDS": {
    "doctor": "Infectious Disease Specialist",
    "alternative_doctor": "HIV Medicine Specialist"
  },
  "Acne": {
    "doctor": "Dermatologist"
  },
  "Alcoholic hepatitis": {
    "doctor": "Gastroenterologist",
    "alternative_doctor": "Hepatologist"
  },
  "Allergy": {
    "doctor": "Allergist / Immunologist"
  },
  "Arthritis": {
    "doctor": "Rheumatologist",
    "alternative_doctor": "Orthopedic Surgeon"
  },
  "Bronchial Asthma": {
    "doctor": "Pulmonologist"
  },
  "Cervical spondylosis": {
    "doctor": "Orthopedic Surgeon",
    "alternative_doctor": "Spine Specialist"
  },
  "Chicken pox": {
    "doctor": "General Physician",
    "alternative_doctor": "Dermatologist"
  },
  "Chronic cholestasis": {
    "doctor": "Hepatologist",
    "alternative_doctor": "Gastroenterologist"
  },
  "Common Cold": {
    "doctor": "General Physician"
  },
  "Covid": {
    "doctor": "General Physician",
    "alternative_doctor": "Pulmonologist"
  },
  "Dengue": {
    "doctor": "General Physician",
    "alternative_doctor": "Internal Medicine Specialist"
  },
  "Diabetes": {
    "doctor": "Endocrinologist",
    "alternative_doctor": "Diabetologist"
  },
  "Dimorphic hemorrhoids(piles)": {
    "doctor": "General Surgeon",
    "alternative_doctor": "Colorectal Surgeon"
  },
  "Drug Reaction": {
    "doctor": "General Physician",
    "alternative_doctor": "Dermatologist"
  },
  "Fungal infection": {
    "doctor": "Dermatologist"
  },
  "GERD": {
    "doctor": "Gastroenterologist"
  },
  "Gastroenteritis": {
    "doctor": "General Physician",
    "alternative_doctor": "Gastroenterologist"
  },
  "Heart attack": {
    "doctor": "Emergency Medicine Specialist",
    "alternative_doctor": "Cardiologist"
  },
  "Hepatitis A": {
    "doctor": "Gastroenterologist",
    "alternative_doctor": "Hepatologist"
  },
  "Hepatitis B": {
    "doctor": "Hepatologist",
    "alternative_doctor": "Gastroenterologist"
  },
  "Hepatitis C": {
    "doctor": "Hepatologist",
    "alternative_doctor": "Gastroenterologist"
  },
  "Hepatitis D": {
    "doctor": "Hepatologist",
    "alternative_doctor": "Gastroenterologist"
  },
  "Hepatitis E": {
    "doctor": "Gastroenterologist",
    "alternative_doctor": "Hepatologist"
  },
  "Hypertension": {
    "doctor": "General Physician",
    "alternative_doctor": "Cardiologist"
  },
  "Hyperthyroidism": {
    "doctor": "Endocrinologist"
  },
  "Hypoglycemia": {
    "doctor": "Endocrinologist",
    "alternative_doctor": "General Physician"
  },
  "Hypothyroidism": {
    "doctor": "Endocrinologist"
  },
  "Impetigo": {
    "doctor": "Dermatologist",
    "alternative_doctor": "General Physician"
  },
  "Jaundice": {
    "doctor": "Gastroenterologist",
    "alternative_doctor": "Hepatologist"
  },
  "Malaria": {
    "doctor": "General Physician",
    "alternative_doctor": "Internal Medicine Specialist"
  },
  "Migraine": {
    "doctor": "Neurologist"
  },
  "Osteoarthritis": {
    "doctor": "Orthopedic Surgeon",
    "alternative_doctor": "Rheumatologist"
  },
  "Paralysis (brain hemorrhage)": {
    "doctor": "Emergency Medicine Specialist",
    "alternative_doctor": "Neurologist",
    "additional_specialist": "Neurosurgeon"
  },
  "Paroxysmal Positional Vertigo": {
    "doctor": "ENT Specialist",
    "alternative_doctor": "Neurologist"
  },
  "Peptic ulcer disease": {
    "doctor": "Gastroenterologist"
  },
  "Pneumonia": {
    "doctor": "Pulmonologist",
    "alternative_doctor": "General Physician"
  },
  "Psoriasis": {
    "doctor": "Dermatologist"
  },
  "Tuberculosis": {
    "doctor": "Pulmonologist",
    "alternative_doctor": "Infectious Disease Specialist"
  },
  "Typhoid": {
    "doctor": "General Physician",
    "alternative_doctor": "Internal Medicine Specialist"
  },
  "Urinary tract infection": {
    "doctor": "General Physician",
    "alternative_doctor": "Urologist"
  },
  "Varicose veins": {
    "doctor": "Vascular Surgeon",
    "alternative_doctor": "General Surgeon"
  }
}

 export function getDoctorSpecialty(disease) {
  return recommends[disease] || "General Physician";
}


