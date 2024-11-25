from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib

from tensorflow.keras.models import load_model
import numpy as np

# Para ejecutar:
#  uvicorn main:app --reload

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"], 
)

class LoanApplication(BaseModel):
    cb_person_cred_hist_length: int
    cb_person_default_on_file: int
    loan_percent_income: float
    loan_int_rate: float
    loan_amnt: int
    loan_grade: int
    loan_intent: str
    person_emp_length: int
    person_home_ownership: str
    person_income: int
    person_age: int

# Ruta raíz
@app.get("/")
def read_root():
    return {"message": "OK"}

 # Cargo el modelo
model = load_model('../../red_neuronal.h5')
scaler = joblib.load('../../scaler.pkl')


@app.post("/evaluar-situacion/")
def evaluar_situacion(data: LoanApplication):

   

    # Preparo los datos para el modelo
    input_data = [
        data.person_age,
        data.person_income,
        data.person_emp_length,
        data.loan_grade,
        data.loan_amnt,
        data.loan_int_rate,
        data.loan_percent_income / 100,
        data.cb_person_default_on_file,
        data.cb_person_cred_hist_length,

        data.person_home_ownership == 'mortgage',
        data.person_home_ownership == 'other',
        data.person_home_ownership == 'own',
        data.person_home_ownership == 'rent',
        
        data.loan_intent == 'debtconsolidation',
        data.loan_intent == 'education',
        data.loan_intent == 'homeimprovement',
        data.loan_intent == 'medical',
        data.loan_intent == 'personal',
        data.loan_intent == 'venture'
    ]
    # Convierto la entrada en un array 2D
    input_array = np.array(input_data).reshape(1, -1)  # Forma (1, n_features)
    scaled_data = scaler.transform(input_array)


    prediction = model.predict(scaled_data)
    print(prediction)
    prediction_total = 1 if prediction > 0.5 else 0
    print("Predicción:", prediction_total)

    return {
        "message": "Solicitud recibida con éxito",
        "prediction": prediction_total
    }

