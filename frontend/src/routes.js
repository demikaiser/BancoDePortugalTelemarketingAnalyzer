import DataQuery from "views/DataQuery.jsx";
import Visualizer from "views/Visualizer.jsx";
import RecordViewer from "views/RecordViwer.jsx";
import ModelLogisticRegression from "views/ModelLogisticRegression";
import ModelSupportVectorMachine from "views/ModelSupportVectorMachine";
import ModelNearestNeighbors from "views/ModelNearestNeighbors";
import ModelDecisionTree from "views/ModelDecisionTree";
import ModelRandomForest from "views/ModelRandomForest";
import ModelAdaBoost from "views/ModelAdaBoost";
import ModelNeuralNetwork from "views/ModelNeuralNetwork";

const dashboardRoutes = [
  {
    path: "/dataquery",
    name: "Data Query ",
    icon: "pe-7s-search",
    component: DataQuery,
    layout: "/admin"
  },
  {
    path: "/recordviewer",
    name: "Record Viewer",
    icon: "pe-7s-note2",
    component: RecordViewer,
    layout: "/admin"
  },
  {
    path: "/visualizer",
    name: "Visualizer",
    icon: "pe-7s-graph",
    component: Visualizer,
    layout: "/admin"
  },
  {
    path: "/modellogisticregression",
    name: "Logistic Regression",
    icon: "pe-7s-vector",
    component: ModelLogisticRegression,
    layout: "/admin"
  },
  {
    path: "/modelsupportvectormachine",
    name: "SVM Classification",
    icon: "pe-7s-airplay",
    component: ModelSupportVectorMachine,
    layout: "/admin"
  },
  {
    path: "/modelnearestneighbors",
    name: "Nearest Neighbors",
    icon: "pe-7s-crop",
    component: ModelNearestNeighbors,
    layout: "/admin"
  },
  {
    path: "/modeldecisiontree",
    name: "Decision Tree",
    icon: "pe-7s-network",
    component: ModelDecisionTree,
    layout: "/admin"
  },
  {
    path: "/modelrandomforest",
    name: "Random Forest",
    icon: "pe-7s-keypad",
    component: ModelRandomForest,
    layout: "/admin"
  },
  {
    path: "/modeladaboost",
    name: "Ada Boost",
    icon: "pe-7s-prev",
    component: ModelAdaBoost,
    layout: "/admin"
  },
  {
    path: "/modelneuralnetwork",
    name: "Neural Network",
    icon: "pe-7s-share",
    component: ModelNeuralNetwork,
    layout: "/admin"
  },
];

export default dashboardRoutes;
