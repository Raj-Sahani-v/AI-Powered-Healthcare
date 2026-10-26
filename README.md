# 🏥 AI-Powered Healthcare Platform

A full-stack healthcare web application built with the **MERN stack** and a **Machine Learning model (Random Forest)** that predicts diseases from user-entered symptoms. The platform provides separate dashboards for **patients**, **doctors**, and **admins**, along with appointment booking and doctor search.

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![Python](https://img.shields.io/badge/ML-Python%20%7C%20Flask-blue)
![Model](https://img.shields.io/badge/Model-Random%20Forest-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Overview](#-api-overview)
- [ML Model](#-ml-model)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

### 👤 Patient Dashboard
- Register / login securely (JWT authentication)
- **AI Symptom Checker** – select symptoms and get a predicted disease
- Find doctors by name, specialization, or availability
- Book, view, reschedule, and cancel appointments
- View appointment history and profile management

### 🩺 Doctor Dashboard
- View and manage upcoming appointments
- Accept / reject / complete appointments
- Manage profile, specialization, fees, and availability
- View patient appointment details

### 🛡️ Admin Panel
- Manage doctors (add, update, remove, approve)
- Manage patients and appointments
- Dashboard overview with platform statistics
- Monitor overall system activity

### 🤖 AI Symptom Prediction
- Random Forest classifier trained on a symptom–disease dataset
- Served through a **Flask** REST API
- Node.js backend communicates with the Flask service and returns predictions to the frontend

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Patient Frontend (MERN) | React.js, React Router, Axios, Tailwind CSS / CSS |
| Admin & Doctor Panel | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| ML Service | Python, Flask, Scikit-learn, Pandas, NumPy |
| ML Model | Random Forest Classifier |

---

## 📁 Project Structure

```
AI-Healthcare/
│
├── AI_Healthcare/        # Patient side (MERN frontend) – React
│
├── Admin/
│   └── main_Admain/      # Admin & Doctor panel – React
│
├── ML/                   # Machine Learning service (Flask + Random Forest)
│   ├── app.py            # Flask API
│   ├── train_model.py    # Model training script
│   ├── model.pkl         # Trained model
│   ├── dataset/          # Symptom–disease dataset
│   └── requirements.txt
│
├── server/               # Node.js + Express backend
│   ├── config/           # DB & environment config
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

> Adjust file names inside each folder to match your actual project.

---

## 🧩 System Architecture

```
┌───────────────┐      ┌──────────────────┐      ┌─────────────────────┐
│  React Client │ ───▶ │  Node/Express API│ ───▶ │  Flask ML Service   │
│ (Patient/Doc/ │ ◀─── │  (server)        │ ◀─── │  (Random Forest)    │
│   Admin)      │      └────────┬─────────┘      └─────────────────────┘
└───────────────┘               │
                                ▼
                         ┌─────────────┐
                         │   MongoDB   │
                         └─────────────┘
```

1. User selects symptoms in the React app.
2. React sends the request to the Node.js server.
3. Node.js forwards the symptoms to the Flask API.
4. Flask runs the Random Forest model and returns the predicted disease.
5. Node.js sends the result back to the React frontend.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/) (v3.8 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Setup the ML Service (Flask)

```bash
cd ML
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

Flask runs on **http://localhost:5001** (change as per your config).

### 3. Setup the Backend (Node.js)

```bash
cd server
npm install
npm run dev
```

Server runs on **http://localhost:5000**.

### 4. Setup the Patient Frontend (MERN)

```bash
cd AI_Healthcare
npm install
npm run dev      # or npm start
```

### 5. Setup the Admin & Doctor Panel

```bash
cd Admin/main_Admain
npm install
npm run dev      # or npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in each folder as shown below.

### `server/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ML_API_URL=http://localhost:5001
```

### `AI_Healthcare/.env` (Patient) and `Admin/main_Admain/.env` (Admin & Doctor)

```env
VITE_API_URL=http://localhost:5000
# For Create React App use:
# REACT_APP_API_URL=http://localhost:5000
```

> ⚠️ Never commit your `.env` files. Add them to `.gitignore`.

---

## 📡 API Overview

> Update routes to match your implementation.

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT |

### Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | List / search doctors |
| GET | `/api/doctors/:id` | Get doctor details |
| POST | `/api/doctors` | Add doctor (Admin) |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/appointments` | Book an appointment |
| GET | `/api/appointments` | Get user's appointments |
| PUT | `/api/appointments/:id` | Update / reschedule status |
| DELETE | `/api/appointments/:id` | Cancel appointment |

### Prediction
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/predict` | Send symptoms, receive predicted disease |

**Example request**

```json
{
  "symptoms": ["fever", "cough", "headache"]
}
```

**Example response**

```json
{
  "prediction": "Common Cold"
}
```

---

## 🤖 ML Model

- **Algorithm:** Random Forest Classifier
- **Library:** Scikit-learn
- **Input:** Binary vector of symptoms
- **Output:** Predicted disease
- **Serving:** Flask REST API

To retrain the model:

```bash
cd ML
python train_model.py
```

> ⚠️ **Disclaimer:** This project is for educational purposes only. The predictions are not a substitute for professional medical advice, diagnosis, or treatment.

---

## 🖼️ Screenshots

Add screenshots of your app here.

| Patient Dashboard | Doctor Dashboard |
|-------------------|------------------|
| ![Patient](screenshots/patient.png) | ![Doctor](screenshots/doctor.png) |

| Symptom Checker | Admin Panel |
|-----------------|-------------|
| ![Symptom](screenshots/symptom.png) | ![Admin](screenshots/admin.png) |

---

## 🔮 Future Improvements

- Online payment integration for appointments
- Video consultation (WebRTC)
- Email / SMS appointment reminders
- Improved model accuracy with larger datasets
- Medical report upload and storage
- Multi-language support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a Pull Request

---

