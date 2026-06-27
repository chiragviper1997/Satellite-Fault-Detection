import numpy as np
import matplotlib.pyplot as plt
import os
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
)


def compute_metrics(y_true, y_pred, model_name="model"):
    """
    Compute and print accuracy, precision, recall, F1.
    Returns a dictionary of metrics.
    """
    accuracy  = accuracy_score(y_true, y_pred)
    precision = precision_score(y_true, y_pred, zero_division=0)
    recall    = recall_score(y_true, y_pred, zero_division=0)
    f1        = f1_score(y_true, y_pred, zero_division=0)

    print(f"\n--- {model_name} Results ---")
    print(f"Accuracy  : {accuracy:.4f}")
    print(f"Precision : {precision:.4f}")
    print(f"Recall    : {recall:.4f}")
    print(f"F1 Score  : {f1:.4f}")

    return {
        "model"     : model_name,
        "accuracy"  : accuracy,
        "precision" : precision,
        "recall"    : recall,
        "f1"        : f1
    }


def plot_confusion_matrix(y_true, y_pred, model_name="model", save=True):
    """
    Plot and optionally save confusion matrix to outputs/plots/.
    """
    cm = confusion_matrix(y_true, y_pred)

    fig, ax = plt.subplots(figsize=(5, 4))
    im = ax.imshow(cm, interpolation="nearest", cmap=plt.cm.Blues)
    plt.colorbar(im, ax=ax)

    classes = ["Nominal (0)", "Fault (1)"]
    ax.set_xticks([0, 1])
    ax.set_yticks([0, 1])
    ax.set_xticklabels(classes)
    ax.set_yticklabels(classes)
    ax.set_xlabel("Predicted label")
    ax.set_ylabel("True label")
    ax.set_title(f"Confusion Matrix — {model_name}")

    # annotate each cell with count
    for i in range(2):
        for j in range(2):
            ax.text(j, i, str(cm[i, j]),
                    ha="center", va="center",
                    color="white" if cm[i, j] > cm.max() / 2 else "black",
                    fontsize=14)

    plt.tight_layout()

    if save:
        os.makedirs("../outputs/plots", exist_ok=True)
        path = f"../outputs/plots/confusion_matrix_{model_name}.png"
        plt.savefig(path, dpi=100)
        print(f"Saved confusion matrix to {path}")

    plt.show()


def plot_loss_curve(epoch_losses, model_name="model", save=True):
    """
    Plot misclassifications per epoch.
    """
    fig, ax = plt.subplots(figsize=(7, 4))
    ax.plot(range(1, len(epoch_losses) + 1), epoch_losses,
            marker="o", markersize=3, linewidth=1.5, color="steelblue")
    ax.set_xlabel("Epoch")
    ax.set_ylabel("Misclassifications")
    ax.set_title(f"Training Loss Curve — {model_name}")
    ax.grid(True, linestyle="--", alpha=0.5)

    plt.tight_layout()

    if save:
        os.makedirs("../outputs/plots", exist_ok=True)
        path = f"../outputs/plots/loss_curve_{model_name}.png"
        plt.savefig(path, dpi=100)
        print(f"Saved loss curve to {path}")

    plt.show()


def save_results(metrics, path="../outputs/results.csv"):
    """
    Append a row of metrics to results.csv.
    Creates the file with headers if it doesn't exist.
    """
    import csv

    os.makedirs(os.path.dirname(path), exist_ok=True)
    file_exists = os.path.isfile(path)

    with open(path, "a", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=metrics.keys())
        if not file_exists:
            writer.writeheader()
        writer.writerow(metrics)

    print(f"Results saved to {path}")