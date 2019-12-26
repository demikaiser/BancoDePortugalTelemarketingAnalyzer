from typing import *
import os.path
import pandas as pd
import numpy as np
import random
from joblib import dump, load
import sklearn.model_selection
import sklearn.linear_model
import sklearn.neighbors
import sklearn.metrics
import sklearn.tree
import sklearn.ensemble
import sklearn.naive_bayes
import sklearn.neural_network


################################################################################
#                     Internal Machine Learning Libraries                      #
################################################################################

def load_data():
    """Returns a loaded data set with a special delimiter."""
    data = pd.read_csv("../dataset/bank.csv", delimiter=";")
    print(data.info())
    return data


def shuffle_data(data, train_ratio):
    """Returns training set and test set from the given training ratio."""
    num_rows = data.shape[0]
    shuffled_indices = list(range(num_rows))
    random.seed(42)  # Do NOT change this number (Warning: Uneven data split)
    random.shuffle(shuffled_indices)

    # Calculate the number of rows for training.
    train_set_size = int(train_ratio * num_rows)

    # Training set: take the first 'train_set_size' rows.
    train_indices = shuffled_indices[:train_set_size]  # Exclusive index.
    # Test set: take the remaining rows.
    test_indices = shuffled_indices[train_set_size:]  # Inclusive index.

    # Create training set and test set.
    train_data = data.iloc[train_indices, :]
    test_data = data.iloc[test_indices, :]
    print(len(train_data), "training + ", len(test_data), "test")

    # Prepare training features and training labels.
    train_features = train_data.drop('y', axis='columns', inplace=False)
    train_features = pd.get_dummies(train_features)
    train_labels = train_data.loc[:, ['y']]

    # Prepare test features and test labels.
    test_features = test_data.drop('y', axis='columns', inplace=False)
    test_features = pd.get_dummies(test_features)
    test_labels = test_data.loc[:, ['y']]

    return train_features, train_labels, test_features, test_labels


def get_trained_model(model_name, model_type, train_features, train_labels):
    """Returns a trained model from the disk, and makes one if doesn't exist."""
    model_path = "./ml_models/model_" + model_name

    if os.path.isfile(model_path):
        model = load(model_path)
        return model
    else:
        model = model_type
        model.fit(train_features, train_labels)
        dump(model, model_path)
        return model


def get_model(model_name, train_features, train_labels):
    """Returns a trained model by the given name."""

    if model_name == "LogisticRegression":
        return get_trained_model(
            model_name, sklearn.linear_model.LogisticRegression(),  # F1: 48.268625
            train_features, train_labels
        )
    elif model_name == "SupportVectorClassifier":
        return get_trained_model(
            model_name, sklearn.svm.SVC(),  # F1: 35.879630
            train_features, train_labels
        )
    elif model_name == "KNeighborsClassifier":
        return get_trained_model(
            model_name, sklearn.neighbors.KNeighborsClassifier(),  # F1: 52.851182
            train_features, train_labels
        )
    elif model_name == "DecisionTreeClassifier":
        return get_trained_model(
            model_name, sklearn.tree.DecisionTreeClassifier(),  # F1: 50.585284
            train_features, train_labels
        )
    elif model_name == "RandomForestClassifier":
        return get_trained_model(
            model_name, sklearn.ensemble.RandomForestClassifier(),  # F1: 49.326425
            train_features, train_labels
        )
    elif model_name == "AdaBoostClassifier":
        return get_trained_model(
            model_name, sklearn.ensemble.AdaBoostClassifier(),  # F1: 48.834746
            train_features, train_labels
        )
    elif model_name == "MLPClassifier":
        return get_trained_model(
            model_name, sklearn.neural_network.MLPClassifier(),  # F1: Unstable
            train_features, train_labels
        )


def evaluation(model, test_features, test_labels):
    """Returns the results from evaluation in a JSON format."""
    pred = model.predict(test_features)

    tn, fp, fn, tp = sklearn.metrics.confusion_matrix(test_labels, pred).ravel()
    print("TN:", tn, "FP: ", fp, "FN: ", fn, "TP: ", tp)

    f1 = sklearn.metrics.f1_score(test_labels, pred, pos_label='yes')
    print("F1 Performance Score: %.6f%%" % (f1 * 100))

    accuracy = sklearn.metrics.accuracy_score(test_labels, pred)
    print("Accuracy Performance Score: %.6f%%" % (accuracy * 100))


    print(sklearn.metrics.classification_report(test_labels, pred))

    return model.__repr__()


def get_machine_learning_result(model_name):
    """Returns machine learning results by the given model."""
    data = load_data()
    train_features, train_labels, test_features, test_labels = shuffle_data(data, 0.75)
    model = get_model(model_name, train_features, train_labels)
    return evaluation(model, test_features, test_labels)


if __name__ == '__main__':
    result = get_machine_learning_result("LogisticRegression")
    # result = get_machine_learning_result("SupportVectorClassifier")
    # result = get_machine_learning_result("KNeighborsClassifier")
    # result = get_machine_learning_result("DecisionTreeClassifier")
    # result = get_machine_learning_result("RandomForestClassifier")
    # result = get_machine_learning_result("AdaBoostClassifier")
    # result = get_machine_learning_result("MLPClassifier")
