/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class AdminNavbarLinks extends Component {
  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="#">
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem>
          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1} href="https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html?highlight=logistic%20regression#sklearn.linear_model.LogisticRegression">Logistic Regression</MenuItem>
            <MenuItem eventKey={2.2} href="https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVC.html?highlight=svm#sklearn.svm.SVC">Support Vector Machine</MenuItem>
            <MenuItem eventKey={2.3} href="https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.NearestNeighbors.html?highlight=nearest#sklearn.neighbors.NearestNeighbors">Nearest Neighbors</MenuItem>
            <MenuItem eventKey={2.4} href="https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html?highlight=decision%20tree#sklearn.tree.DecisionTreeClassifier">Decision Tree</MenuItem>
            <MenuItem eventKey={2.5} href="https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html?highlight=random%20forest#sklearn.ensemble.RandomForestClassifier">Random Forest</MenuItem>
            <MenuItem eventKey={2.6} href="https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.AdaBoostClassifier.html?highlight=ada%20boost#sklearn.ensemble.AdaBoostClassifier">Ada Boost</MenuItem>
            <MenuItem eventKey={2.7} href="https://scikit-learn.org/stable/modules/generated/sklearn.neural_network.MLPClassifier.html#sklearn.neural_network.MLPClassifier">Neural Network</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="https://www.google.com">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="https://archive.ics.uci.edu/ml/datasets/bank+marketing">UCI Dataset Source</NavItem>
          <NavDropdown
            eventKey={2}
            title="References"
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1} href="https://reactjs.org">React</MenuItem>
            <MenuItem eventKey={2.2} href="https://material-ui.com">Material UI</MenuItem>
            <MenuItem eventKey={2.3} href="https://www.creative-tim.com">Creative Tim</MenuItem>
            <MenuItem eventKey={2.4} href="http://flask.palletsprojects.com">Flask</MenuItem>
            <MenuItem eventKey={2.5} href="https://pandas.pydata.org">Pandas</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5} href="https://scikit-learn.org">Scikit</MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
