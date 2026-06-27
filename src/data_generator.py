import numpy as np
import pandas as pd
import os

config = {
    "n_samples"      : 1000,
    "fault_rate"     : 0.15,
    "fault_duration" : 20,
    "noise_level"    : 0.05,
    "random_seed"    : 42
}

normal_ranges = {
    "battery_voltage"    : (24.0, 28.0),
    "solar_current"      : (1.5,  3.5),
    "panel_temp"         : (-10.0, 60.0),
    "onboard_temp"       : (15.0,  35.0),
    "attitude_error"     : (0.0,   0.5),
    "reaction_wheel_rpm" : (1000.0, 5000.0)
}

fault_signatures = {
    "battery_voltage"    : (18.0, 21.0),
    "solar_current"      : (0.0,  0.2),
    "panel_temp"         : (80.0, 95.0),
    "onboard_temp"       : (50.0, 65.0),
    "attitude_error"     : (2.0,  5.0),
    "reaction_wheel_rpm" : (0.0,  100.0)
}

def generate(config = config):
    np.random.seed(config["random_seed"])

    df = pd.DataFrame()

    for sensor, (low, high) in normal_ranges.items():
        df[sensor] = np.random.uniform(low, high, config["n_samples"])

    for sensor in normal_ranges.keys():
        df[sensor] += np.random.normal(0, config["noise_level"], config["n_samples"])

    df["label"] = 0

    n_faults  = int(config["n_samples"] * config["fault_rate"])
    n_windows = n_faults // config["fault_duration"]

    for _ in range(n_windows):
        start = np.random.randint(0, config["n_samples"] - config["fault_duration"])
        end   = start + config["fault_duration"]

        for sensor, (low, high) in fault_signatures.items():
            df.loc[start:end, sensor] = np.random.uniform(
                low, high, config["fault_duration"] + 1
            )

        df.loc[start:end, "label"] = 1

    return df

def save(df, path="../data/synthetic/telemetry.csv"):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    df.to_csv(path, index=False)
    print(f"Saved to {path} — shape: {df.shape}")

if __name__ == "__main__":
    df = generate()
    save(df)
    print("Fault samples  :", df["label"].sum())
    print("Nominal samples:", (df["label"] == 0).sum())