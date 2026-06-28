from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import predict

app = FastAPI(title="Satellite Fault Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class SensorInput(BaseModel):
    battery_voltage    : float
    solar_current      : float
    panel_temp         : float
    onboard_temp       : float
    attitude_error     : float
    reaction_wheel_rpm : float

@app.get("/")
def root():
    return {"status": "Satellite Fault Detection API is running"}

@app.post("/predict")
def predict_fault(data: SensorInput):
    features = [
        data.battery_voltage,
        data.solar_current,
        data.panel_temp,
        data.onboard_temp,
        data.attitude_error,
        data.reaction_wheel_rpm
    ]
    result = predict(features)
    return result