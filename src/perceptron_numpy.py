import numpy as np

def init_weights(n_features):
    """
    Initialize weights to zero.
    w: weight vector of shape(n_features,)
    b: bias scalar, initialized to 0
    """

    w = np.zeros(n_features)
    b = 0.0
    return w, b

def forward(X, w, b):
    """
    Compute weighted sum and apply step activation.
    z = X·w + b
    ŷ = 1 if z >= 0 else 0
    """
    z  = np.dot(X, w) + b
    y_hat = np.where(z >= 0, 1, 0)
    return y_hat

def train(X, y, lr = 0.01, epochs = 50 ):
    """
    Train the perceptron using the perceptron learning rule.
    wᵢ ← wᵢ + lr · (y - ŷ) · xᵢ
    b  ← b  + lr · (y - ŷ)
    Returns trained weights, bias, and loss per epoch.
    """
    n_samples, n_features = X.shape
    w, b = init_weights(n_features)

    epoch_losses = []

    for epoch in range(epochs):
        n_errors = 0

        for i in range(n_samples):
            y_hat = forward(X[i], w, b)
            error = y[i] - y_hat

            if error != 0:
                w        += lr * error * X[i]
                b        += lr * error
                n_errors += 1

        epoch_losses.append(n_errors)

        if (epoch + 1) % 10 == 0:
            print(f"Epoch {epoch + 1:3d}/{epochs} — misclassifications: {n_errors}")

    return w, b, epoch_losses

def predict(X, w, b):
    """
    Run forward pass on full dataset and return predictions.
    """
    return forward(X, w, b)







