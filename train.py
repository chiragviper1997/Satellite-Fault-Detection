import sys
import os

# always find src/ relative to train.py location regardless of where it is called from
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "src"))

from data_loader import load
from preprocessor import preprocess
from perceptron_numpy import train, predict
from evaluate import compute_metrics, plot_loss_curve, plot_confusion_matrix, save_results
from utils import set_seed, save_weights

# ── config ────────────────────────────────────────────────────────────────────
config = {
    "data_source" : "synthetic",  # "synthetic" or "real"
    "lr"          : 0.01,
    "epochs"      : 50,
    "val_size"    : 0.2,
    "random_seed" : 42
}
# ──────────────────────────────────────────────────────────────────────────────

def main():
    print("=== Satellite Fault Detection — SLP Training ===\n")

    # step 1: seed
    set_seed(config["random_seed"])

    # step 2: load
    df = load(source=config["data_source"])

    # step 3: preprocess
    X_train, X_val, y_train, y_val = preprocess(
        df,
        val_size    = config["val_size"],
        random_seed = config["random_seed"]
    )

    # step 4: train
    print(f"\nTraining NumPy SLP — lr={config['lr']}, epochs={config['epochs']}\n")
    w, b, losses = train(X_train, y_train,
                         lr     = config["lr"],
                         epochs = config["epochs"])

    # step 5: predict
    y_pred = predict(X_val, w, b)

    # step 6: evaluate
    metrics = compute_metrics(y_val, y_pred, model_name="numpy_slp")

    # step 7: plots
    plot_loss_curve(losses, model_name="numpy_slp")
    plot_confusion_matrix(y_val, y_pred, model_name="numpy_slp")

    # step 8: save
    save_weights(w, b)
    save_results(metrics)

    print("\n=== Done ===")

if __name__ == "__main__":
    main()