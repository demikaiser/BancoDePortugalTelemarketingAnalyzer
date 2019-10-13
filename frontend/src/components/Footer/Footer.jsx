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
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            <a href="http://www.jakejonghunchoi.com">Jake J. Choi</a> powered by 
            <a href="https://reactjs.org/"> React</a>, 
            <a href="http://www.creative-tim.com?ref=lbr-footer"> Creative Tim</a>, 
            <a href="http://flask.palletsprojects.com/en/1.1.x/"> Flask</a>, 
            <a href="https://pandas.pydata.org/"> Pandas</a>, 
            and 
            <a href="https://scikit-learn.org/stable/"> Scikit</a>
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
