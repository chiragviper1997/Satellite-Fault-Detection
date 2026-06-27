import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

def drop_low_variance(df, threshold = 0.01):
    feature_cols = [col for col in df.columns if col != "label"]
    variances    = df[feature_cols].var()
    keep         = variances[variances > threshold].index.tolist()
    dropped      = variances[variances <= threshold].index.tolist()

    if dropped:
        print(f"Dropped low-variance columns: {dropped}")
    else:
        print("No low-variance columns found — keeping all features")

    return df[keep + ["label"]]


def normalize(X_train, X_val):
    # compute min and max ONLY from training set — never from val set
    X_min = X_train.min(axis = 0)
    X_max = X_train.max(axis = 0)

    X_train_norm = (X_train - X_min) / (X_max - X_min + 1e-8)
    X_val_norm   = (X_val   - X_min) / (X_max - X_min + 1e-8)

    return X_train_norm, X_val_norm


def split(df, val_size = 0.2, random_seed = 42):
    feature_cols = [col for col in df.columns if col != "label"]

    X = df[feature_cols].values
    y = df["label"].values

    X_train, X_val, y_train, y_val = train_test_split(
        X, y,
        test_size    = val_size,
        random_state = random_seed,
        stratify     = y        # keeps fault ratio same in both splits
    )

    print(f"X_train : {X_train.shape}  faults: {y_train.sum()}")
    print(f"X_val   : {X_val.shape}  faults: {y_val.sum()}")

    return X_train, X_val, y_train, y_val


def preprocess(df, val_size = 0.2, random_seed = 42, variance_threshold = 0.01):
    df            = drop_low_variance(df, threshold = variance_threshold)
    X_train, X_val, y_train, y_val = split(df, val_size, random_seed)
    X_train, X_val = normalize(X_train, X_val)

    return X_train, X_val, y_train, y_val