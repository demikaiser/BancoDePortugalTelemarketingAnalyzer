import React, { Component } from "react";
import axios from 'axios';
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";

var optionsBar = {
  seriesBarDistance: 10,
  axisX: {
    showGrid: true
  },
  height: "275px"
};

var responsiveBar = [
  [
    "screen and (max-width: 640px)",
    {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value[0];
        }
      }
    }
  ]
];

var legendBar = {
  names: ["Yes to Marketing", "No to Marketing"],
  types: ["info", "danger"]
};

class Visualizer extends Component {

  componentWillMount() {
    this.setState({ statistics: null })
    axios.get('http://localhost:5000/statistics')
      .then(response => {
        this.setState({ statistics: response.data.statistics})
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
    if (this.state.statistics) {
      return (
        <div className="content">
          <Grid fluid>
            { 
              Object.keys(this.state.statistics).map((item, key) => {
                if (this.state.statistics[item].type === "numerical") {
                  return (
                    <Row key={item}>
                      <Col md={8}>
                        <Card
                          id={item + "Distribution"}
                          title={item + " distribution"}
                          category={this.state.statistics[item].type}
                          stats={this.state.statistics[item].explanation}
                          statsIcon="pe-7s-tools text-success"
                          content={
                            <div className="ct-chart">
                              <ChartistGraph
                                data={this.state.statistics[item].graph}
                                type="Bar"
                                options={optionsBar}
                                responsiveOptions={responsiveBar}
                              />
                            </div>
                          }
                          legend={
                            <div className="legend">{this.createLegend(legendBar)}</div>
                          }
                        />
                      </Col>
                      <Col md={4}>
                        <Card
                          id={item + "DataSheet"}
                          content={
                            <Table hover striped bordered size="sm">
                              <thead>
                                <tr>
                                  {
                                    [item, "All", "Yes", "No"].map((prop, key) => {
                                      return (
                                      <th key={key}>{prop}</th>
                                      );
                                    })
                                  }
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  [
                                    [
                                      "count:", this.state.statistics[item]["description"]["count"], 
                                      this.state.statistics[item]["description_for_yes"]["count"], 
                                      this.state.statistics[item]["description_for_no"]["count"], 
                                    ],
                                    [
                                      "min:", this.state.statistics[item]["description"]["min"].toFixed(3), 
                                      this.state.statistics[item]["description_for_yes"]["min"].toFixed(3), 
                                      this.state.statistics[item]["description_for_no"]["min"].toFixed(3), 
                                    ],
                                    [
                                      "max:", this.state.statistics[item]["description"]["max"].toFixed(3), 
                                      this.state.statistics[item]["description_for_yes"]["max"].toFixed(3), 
                                      this.state.statistics[item]["description_for_no"]["max"].toFixed(3), 
                                    ],
                                    [
                                      "mean:", this.state.statistics[item]["description"]["mean"].toFixed(3), 
                                      this.state.statistics[item]["description_for_yes"]["mean"].toFixed(3), 
                                      this.state.statistics[item]["description_for_no"]["mean"].toFixed(3), 
                                    ],
                                    [
                                      "std:", this.state.statistics[item]["description"]["std"].toFixed(3), 
                                      this.state.statistics[item]["description_for_yes"]["std"].toFixed(3), 
                                      this.state.statistics[item]["description_for_no"]["std"].toFixed(3), 
                                    ],
                                    [
                                      "25%:", this.state.statistics[item]["description"]["25%"].toFixed(3), 
                                      this.state.statistics[item]["description_for_yes"]["25%"].toFixed(3), 
                                      this.state.statistics[item]["description_for_no"]["25%"].toFixed(3), 
                                    ],
                                    [
                                      "50%:", this.state.statistics[item]["description"]["50%"].toFixed(3), 
                                      this.state.statistics[item]["description_for_yes"]["50%"].toFixed(3), 
                                      this.state.statistics[item]["description_for_no"]["50%"].toFixed(3), 
                                    ],
                                    [
                                      "75%:", this.state.statistics[item]["description"]["75%"].toFixed(3), 
                                      this.state.statistics[item]["description_for_yes"]["75%"].toFixed(3), 
                                      this.state.statistics[item]["description_for_no"]["75%"].toFixed(3), 
                                    ],
                                  ].map((prop, key) => {
                                    return (
                                      <tr key={key}>{
                                        prop.map((prop, key)=> {
                                          return (
                                              <td  key={key}>{prop}</td>
                                          );
                                        })
                                      }</tr>
                                    )
                                  })
                                }
                              </tbody>
                            </Table>
                          }
                        />
                      </Col>
                    </Row>
                  ) 
                } else if (this.state.statistics[item].type  === "categorical") {
                  return (
                    <Row key={item}>
                      <Col md={4}>
                        <Card
                          id={item + "PieChart"}
                          title={item + " ratio"}
                          category={this.state.statistics[item].type}
                          statsIcon="fa fa-clock-o"
                          stats={this.state.statistics[item]["description"]["top"] + " has the highest frequencies of all."}
                          content={
                            <div
                              id="chartPreferences"
                              className="ct-chart ct-perfect-fourth"
                            >
                              <ChartistGraph 
                                data={{
                                  labels: [
                                    "All " + this.state.statistics[item]["description"]["top"],
                                    "All Others",
                                    "Yes " + this.state.statistics[item]["description_for_yes"]["top"],
                                    "Yes Others",
                                    "No " + this.state.statistics[item]["description_for_no"]["top"],
                                    "No Others",
                                  ],
                                  series: [
                                    this.state.statistics[item]["description"]["freq"],
                                    this.state.statistics[item]["description"]["count"] 
                                      - this.state.statistics[item]["description"]["freq"],
                                    this.state.statistics[item]["description_for_yes"]["freq"],
                                    this.state.statistics[item]["description_for_yes"]["count"] 
                                      - this.state.statistics[item]["description_for_yes"]["freq"],
                                    this.state.statistics[item]["description_for_no"]["freq"],
                                    this.state.statistics[item]["description_for_no"]["count"] 
                                      - this.state.statistics[item]["description_for_no"]["freq"],
                                  ]
                                }} 
                                type="Pie" 
                              />
                            </div>
                          }
                          legend={
                            <div className="legend">{this.createLegend({
                                names: [
                                  "All",
                                  "Others",
                                  "Yes",
                                  "Yes Others",
                                  "No",
                                  "No Others",
                                ],
                                types: ["info", "danger", "warning", "secondary", "success", "primary"]
                            })}</div>
                          }
                        />
                      </Col>
                      <Col md={8}>
                        <Card
                          id={item + "Distribution"}
                          title={item + " distribution"}
                          category={this.state.statistics[item].type}
                          stats={this.state.statistics[item].explanation}
                          statsIcon="pe-7s-tools text-success"
                          content={
                            <div className="ct-chart">
                              <ChartistGraph
                                data={this.state.statistics[item].graph}
                                type="Bar"
                                options={optionsBar}
                                responsiveOptions={responsiveBar}
                              />
                            </div>
                          }
                          legend={
                            <div className="legend">{this.createLegend(legendBar)}</div>
                          }
                        />
                      </Col>
                    </Row>
                  ) 
                }
              }) 
            }
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

export default Visualizer;

