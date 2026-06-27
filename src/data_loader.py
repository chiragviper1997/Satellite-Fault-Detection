import pandas as pd

def load(source = "synthetic"):
    if source == "synthetic":
        path = "../data/synthetic/telemetry.csv"
    elif source == "real":
        path = "../data/real/dataset.csv"
    else:
        raise ValueError(f"Unknown source '{source}'. Use 'synthetic' or 'real'.")

    df = pd.read_csv(path)

    print(f"Loaded {source} data")
    print(f"Shape   : {df.shape}")
    print(f"Columns : {list(df.columns)}")
    print(f"Faults  : {df['label'].sum()}")
    print(f"Nominal : {(df['label'] == 0).sum()}")

    return df