import numpy as np
import os


def set_seed(seed = 42):
    """
    Set random seed for reproducibility.
    """
    np.random.seed(seed)


def save_weights(w, b, path = "../outputs/weights/numpy_slp.npy"):
    """
    Save NumPy SLP weights and bias to disk.
    w : weight vector
    b : bias scalar
    """
    os.makedirs(os.path.dirname(path), exist_ok = True)
    np.save(path, {"w": w, "b": b})
    print(f"Weights saved to {path}")


def load_weights(path = "../outputs/weights/numpy_slp.npy"):
    """
    Load NumPy SLP weights and bias from disk.
    Returns w, b.
    """
    data = np.load(path, allow_pickle = True).item()
    print(f"Weights loaded from {path}")
    return data["w"], data["b"]