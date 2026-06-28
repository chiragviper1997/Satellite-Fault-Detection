import numpy as np
import os

WEIGHTS_PATH = os.path.join(
    os.path.dirname(__file__),
    "..", "outputs", "weights", "numpy_slp.npy"
)

# training set min/max for each feature — same order as training
# battery_voltage, solar_current, panel_temp, onboard_temp, attitude_error, reaction_wheel_rpm
FEATURE_MIN = np.array([18.0,  0.0,  -10.0, 15.0, 0.0,    0.0  ])
FEATURE_MAX = np.array([28.05, 3.505, 95.05, 65.05, 5.005, 5000.05])

def load_weights():
    data = np.load(WEIGHTS_PATH, allow_pickle=True).item()
    return data["w"], data["b"]

def normalize(x: np.ndarray) -> np.ndarray:
    return (x - FEATURE_MIN) / (FEATURE_MAX - FEATURE_MIN + 1e-8)

def predict(features: list) -> dict:
    w, b   = load_weights()
    x_raw  = np.array(features)
    x_norm = normalize(x_raw)

    z     = np.dot(x_norm, w) + b
    y_hat = int(z >= 0)

    label      = "Fault" if y_hat == 1 else "Nominal"
    confidence = round(float(abs(z)), 4)

    return {
        "prediction" : y_hat,
        "label"      : label,
        "confidence" : confidence
    }