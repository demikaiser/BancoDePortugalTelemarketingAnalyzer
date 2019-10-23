import Dashboard from "views/Dashboard.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Notifications from "views/Notifications.jsx";
import DataQuery from "views/DataQuery.jsx";
import Visualizer from "views/Visualizer.jsx";
import RecordViewer from "views/RecordViwer.jsx";
import ModelLogisticRegression from "views/ModelLogisticRegression";
import ModelSupportVectorMachine from "views/ModelSupportVectorMachine";
import ModelNearestNeighbors from "views/ModelNearestNeighbors";
import ModelDecisionTrees from "views/ModelDecisionTrees";
import ModelNeuralNetwork from "views/ModelNeuralNetwork";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "==== ==== ====",
    icon: "pe-7s-close",
    component: Notifications,
    layout: "/admin"
  },
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
    path: "/modeldecisiontrees",
    name: "Decision Trees",
    icon: "pe-7s-network",
    component: ModelDecisionTrees,
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
