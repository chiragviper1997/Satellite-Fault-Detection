import numpy as np
from sklearn.linear_model import Perceptron


def init_weights(n_features):
    """
    Initialize the sklearn Perceptron model.
    Returns a fresh unfitted model.
    """
    model = Perceptron(max_iter = 1, warm_start = True, random_state = 42)
    return model


def forward(X, model):
    """
    Run prediction on input X using fitted model.
    """
    return model.predict(X)


def train(X, y, lr = 0.01, epochs = 50):
    """
    Train sklearn Perceptron epoch by epoch.
    Matches the same interface as perceptron_numpy.train().
    Returns model, None (no bias separate), and epoch losses.
    """
    n_features = X.shape[1]
    model      = init_weights(n_features)
    model.eta0 = lr

    epoch_losses = []

    for epoch in range(epochs):
        model.fit(X, y)
        y_hat    = forward(X, model)
        n_errors = (y_hat != y).sum()
        epoch_losses.append(n_errors)

        if (epoch + 1) % 10 == 0:
            print(f"Epoch {epoch + 1:3d}/{epochs} — misclassifications: {n_errors}")

    return model, None, epoch_losses


def predict(X, model, b = None):
    """
    Return predictions for X.
    b is unused — kept for interface consistency with perceptron_numpy.
    """
    return forward(X, model)