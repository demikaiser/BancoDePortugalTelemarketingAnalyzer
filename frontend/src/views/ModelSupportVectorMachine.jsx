import React, { Component } from "react";
import axios from 'axios';
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import ChartistGraph from "react-chartist";

class ModelSupportVectorMachine extends Component {
    
  componentWillMount() {
    this.setState({ statistics: null })
    axios.get('http://localhost:5000/models/support-vector-machine')
      .then(response => {
        this.setState({ data: response.data})
      })
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  render() {
    if (this.state.data) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col lg={3} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-door-lock text-warning" />}
                  statsText="Accuracy"
                  statsValue={this.state.data.accuracy_score.toFixed(6)}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Accuracy classification score"
                />
              </Col>
              <Col lg={3} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-wristwatch text-success" />}
                  statsText="F1 Score"
                  statsValue={this.state.data.f1_score.toFixed(6)}
                  statsIcon={<i className="fa fa-calendar-o" />}
                  statsIconText="Also known as F-Score or F-Measure"
                />
              </Col>
              <Col lg={3} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-target text-danger" />}
                  statsText="Hamming Loss"
                  statsValue={this.state.data.hamming_loss.toFixed(6)}
                  statsIcon={<i className="fa fa-clock-o" />}
                  statsIconText="Average hamming loss"
                />
              </Col>
              <Col lg={3} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-ribbon text-info" />}
                  statsText="Matthews Coef."
                  statsValue={this.state.data.matthews_corrcoef.toFixed(6)}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Matthews correlation coefficient"
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Card
                  statsIcon="fa fa-clock-o"
                  title="True Labels"
                  category="The original responses from the data"
                  stats="Yes: False Negative + True Positive, No: True Negative + False Positive"
                  content={
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      <ChartistGraph data={{
                        labels: ["Yes", "No"],
                        series: [
                          this.state.data.confusion_matrix.fn + this.state.data.confusion_matrix.tp,
                          this.state.data.confusion_matrix.tn + this.state.data.confusion_matrix.fp, 
                        ]
                      }} type="Pie" />
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend({
                      names: ["No", "Yes"],
                      types: ["danger", "info"]
                    })}</div>
                  }
                />
              </Col>
              <Col md={4}>
                <Card
                  statsIcon="fa fa-clock-o"
                  title="Prediction Labels"
                  category="The predicted values from the model"
                  stats="Yes: False Positive + True Positive, No: True Negative + False Negative"
                  content={
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      <ChartistGraph data={{
                        labels: ["Yes", "No"],
                        series: [
                          this.state.data.confusion_matrix.fp + this.state.data.confusion_matrix.tp,
                          this.state.data.confusion_matrix.tn + this.state.data.confusion_matrix.fn, 
                        ]
                      }} type="Pie" />
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend({
                      names: ["No", "Yes"],
                      types: ["danger", "info"]
                    })}</div>
                  }
                />
              </Col>
              <Col md={4}>
                <Card
                  id="chartActivity"
                  title="Confusion Matrix"
                  category="Matrix value counter"
                  stats={this.state.data.model_name}
                  statsIcon="fa fa-check"
                  content={
                    <div className="ct-chart">
                      <ChartistGraph
                        data={{
                          labels: [
                            this.state.data.confusion_matrix.fn,
                            this.state.data.confusion_matrix.fp,
                            this.state.data.confusion_matrix.tn,
                            this.state.data.confusion_matrix.tp,
                          ],
                          series: [
                            [this.state.data.confusion_matrix.fn, 0, 0, 0],
                            [0, this.state.data.confusion_matrix.fp, 0, 0],
                            [0, 0, this.state.data.confusion_matrix.tn, 0],
                            [0, 0, 0, this.state.data.confusion_matrix.tp],
                          ]
                        }}
                        type="Bar"
                        options={{
                          seriesBarDistance: 10,
                          axisX: {
                            showGrid: true
                          },
                          height: "245px"
                        }}
                        responsiveOptions={[[
                          "screen and (max-width: 640px)",
                          {
                            seriesBarDistance: 5,
                            axisX: {
                              labelInterpolationFnc: function(value) {
                                return value[0];
                              }
                            }
                          }
                        ]]}
                      />
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend({
                      names: ["False Negative", "False Positive", "True Negative", "True Positive"],
                      types: ["info", "danger", "warning", "primary"]
                    })}</div>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="content">
          <Card
            content={
              <div className="text-center">
                <h2>
                  <i className="pe-7s-cloud-download" /> Loading the Data 
                </h2>
              </div>
            }
          />
        </div>
      )
    }
  }

}

export default ModelSupportVectorMachine;
