from typing import *
from flask import jsonify
import app.learners


def model_logistic_regression():
    return jsonify(app.learners.get_machine_learning_result("LogisticRegression"))


def model_support_vector_machine():
    return jsonify(app.learners.get_machine_learning_result("SupportVectorClassifier"))


def model_nearest_neighbors():
    return jsonify(app.learners.get_machine_learning_result("KNeighborsClassifier"))


def model_decision_tree():
    return jsonify(app.learners.get_machine_learning_result("DecisionTreeClassifier"))


def model_random_forest():
    return jsonify(app.learners.get_machine_learning_result("RandomForestClassifier"))


def model_ada_boost():
    return jsonify(app.learners.get_machine_learning_result("AdaBoostClassifier"))


def model_neural_network():
    return jsonify(app.learners.get_machine_learning_result("MLPClassifier"))
