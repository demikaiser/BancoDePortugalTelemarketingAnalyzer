import React, { Component } from "react";
import axios from 'axios';
import store from '../redux/store';
import { connect } from 'react-redux';
import { 
  fetchFilteredRecordsRequest, 
  fetchFilteredRecordsSuccess, 
  fetchFilteredRecordsFailure 
} from '../redux/actions';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Checkbox from 'components/CustomCheckbox/CustomCheckbox';
import Slider from '@material-ui/core/Slider';

class DataQuery extends Component {

  queryData() {
    store.dispatch(fetchFilteredRecordsRequest());
    axios.post('http://localhost:5000/records', JSON.stringify(this.state))
      .then(response => {
        store.dispatch(fetchFilteredRecordsSuccess(response.data));
      })
      .catch(error => {
        store.dispatch(fetchFilteredRecordsFailure(error.message));
      })
  }

  constructor(props) {
    super(props);
    this.state = {
      // ====> bank client data:
      // 01 - age: (numeric) e.g., "age": 56
      "age": [17, 98],

      // 02 - job: type of job (categorical: "admin.","blue-collar","entrepreneur",
      // "housemaid","management","retired","self-employed","services","student",
      // "technician","unemployed","unknown") e.g., "job": "housemaid"
      "job_admin": true,
      "job_blue_collar": true,
      "job_entrepreneur": true,
      "job_housemaid": true,
      "job_management": true,
      "job_retired": true,
      "job_self_employed": true,
      "job_services": true,
      "job_student": true,
      "job_technician": true,
      "job_unemployed": true,
      "job_unknown": true,

      // 03 - marital : marital status (categorical: "divorced","married","single",
      // "unknown"; note: "divorced" means divorced or widowed) e.g., "marital": "married"
      "marital_divorced": true,
      "marital_married": true,
      "marital_single": true,
      "marital_unknown": true,

      // 04 - education (categorical: "basic.4y","basic.6y","basic.9y","high.school",
      // "illiterate","professional.course","university.degree","unknown") 
      // e.g., "education": "basic.4y"
      "education_basic_4y": true,
      "education_basic_6y": true,
      "education_basic_9y": true,
      "education_high_school": true,
      "education_illiterate": true,
      "education_professional_course": true,
      "education_university_degree": true,
      "education_unknown": true,

      // 05 - default: has credit in default? (categorical: "no","yes","unknown") 
      // e.g., "default": "no"
      "default_no": true,
      "default_yes": true,
      "default_unknown": true,

      // 06 - housing: has housing loan? (categorical: "no","yes","unknown") 
      // e.g., "housing": "no"
      "housing_no": true,
      "housing_yes": true,
      "housing_unknown": true,

      // 07 - loan: has personal loan? (categorical: "no","yes","unknown") 
      // e.g., "loan": "no"
      "loan_no": true,
      "loan_yes": true,
      "loan_unknown": true,
  
      // ====> related with the last contact of the current campaign:
      // 08 - contact: contact communication type (categorical: "cellular",
      // "telephone") e.g., "contact": "telephone"
      "contact_cellular": true,
      "contact_telephone": true,

      // 09 - month: last contact month of year (categorical: "jan", "feb", 
      // "mar", ..., "nov", "dec") e.g., "month": "may"
      "month_jan": true,
      "month_feb": true,
      "month_mar": true,
      "month_apr": true,
      "month_may": true,
      "month_jun": true,
      "month_jul": true,
      "month_aug": true,
      "month_sep": true,
      "month_oct": true,
      "month_nov": true,
      "month_dec": true,

      // 10 - day_of_week: last contact day of the week (categorical: "mon",
      // "tue","wed","thu","fri") e.g., "day_of_week": "mon"
      "day_of_week_mon": true,
      "day_of_week_tue": true,
      "day_of_week_wed": true,
      "day_of_week_thu": true,
      "day_of_week_fri": true,

      // 11 - duration: last contact duration, in seconds (numeric). Important 
      // note:  this attribute highly affects the output target (e.g., if duration=0 
      // then y="no"). Yet, the duration is not known before a call is performed. 
      // Also, after the end of the call y is obviously known. Thus, this input should 
      // only be included for benchmark purposes and should be discarded if the intention 
      // is to have a realistic predictive model. e.g., "duration": 261
      "duration": [0, 4918],
  
      // ====> other attributes:
      // 12 - campaign: number of contacts performed during this campaign and for 
      // this client (numeric, includes last contact) e.g., "campaign": 1
      "campaign": [1, 56],

      // 13 - pdays: number of days that passed by after the client was last 
      // contacted from a previous campaign (numeric; 999 means client was not 
      // previously contacted) e.g., "pdays": 999
      "pdays": [0, 999],

      // 14 - previous: number of contacts performed before this campaign and for 
      // this client (numeric) e.g., "previous": 0
      "previous": [0, 7],

      // 15 - poutcome: outcome of the previous marketing campaign (categorical: 
      // "failure","nonexistent","success") e.g., "poutcome": "nonexistent"
      "poutcome_failure": true,
      "poutcome_nonexistent": true,
      "poutcome_success": true,
  
      // ====> social and economic context attributes
      // 16 - emp_var_rate: employment variation rate - quarterly indicator 
      // (numeric) e.g., "emp_var_rate": 1.1
      "emp_var_rate": [-3.4, 1.4],

      // 17 - cons_price_idx: consumer price index - monthly indicator 
      // (numeric) e.g., "cons_price_idx": 93.994
      "cons_price_idx": [92.201, 94.767],

      // 18 - cons_conf_idx: consumer confidence index - monthly indicator 
      // (numeric) e.g., "cons_conf_idx": -36.4
      "cons_conf_idx": [-50.8, -26.9],

      // 19 - euribor3m: euribor 3 month rate - daily indicator (numeric) 
      // e.g., "euribor3m": 4.857
      "euribor3m": [0.634, 5.045],

      // 20 - nr_employed: number of employees - quarterly indicator (numeric) 
      // e.g., "nr_employed": 5191.0
      "nr_employed": [4963.6, 5228.1],
  
      // <Output variable (desired target)>
      // 21 - y: has the client subscribed a term deposit? (binary: "yes","no") 
      // e.g., "y": "no"
      "y_yes": true,
      "y_no": true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSliderChange= this.handleSliderChange.bind(this);
    this.queryData = this.queryData.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id;
    this.setState({
      [id]: value
    });
  }

  handleSliderChange(event, value) {
    const id = event.target.id;
    this.setState({
      [id]: value
    });
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={6}>
              <Card
                title="Client Specific"
                content={
                  <div>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-user text-info" />&nbsp;&nbsp;Age</ControlLabel>
                          <Slider
                            id="age"
                            min={17}
                            max={98}
                            value={this.state.age}
                            onChange={this.handleSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-id text-primary" />&nbsp;&nbsp;Job</ControlLabel>
                          <Checkbox number="job_admin" checked={this.state.job_admin}  onChange={this.handleInputChange} label="admin" />
                          <Checkbox number="job_blue_collar" checked={this.state.job_blue_collar}  onChange={this.handleInputChange} label="blue_collar" />
                          <Checkbox number="job_entrepreneur" checked={this.state.job_entrepreneur}  onChange={this.handleInputChange} label="entrepreneur" />
                          <Checkbox number="job_housemaid" checked={this.state.job_housemaid}  onChange={this.handleInputChange} label="housemaid" />
                          <Checkbox number="job_management" checked={this.state.job_management}  onChange={this.handleInputChange} label="management" />
                          <Checkbox number="job_retired" checked={this.state.job_retired}  onChange={this.handleInputChange} label="retired" />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup controlId="">
                          <ControlLabel></ControlLabel>
                          <Checkbox number="job_self_employed" checked={this.state.job_self_employed}  onChange={this.handleInputChange} label="self_employed" />
                          <Checkbox number="job_services" checked={this.state.job_services}  onChange={this.handleInputChange} label="services" />
                          <Checkbox number="job_student" checked={this.state.job_student}  onChange={this.handleInputChange} label="student" />
                          <Checkbox number="job_technician" checked={this.state.job_technician}  onChange={this.handleInputChange} label="technician" />
                          <Checkbox number="job_unemployed" checked={this.state.job_unemployed}  onChange={this.handleInputChange} label="unemployed" />
                          <Checkbox number="job_unknown" checked={this.state.job_unknown}  onChange={this.handleInputChange} label="unknown" />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-gift text-danger" />&nbsp;&nbsp;Marital</ControlLabel>
                          <Checkbox number="marital_divorced" checked={this.state.marital_divorced}  onChange={this.handleInputChange} label="divorced" />
                          <Checkbox number="marital_married" checked={this.state.marital_married}  onChange={this.handleInputChange} label="married" />
                          <Checkbox number="marital_single" checked={this.state.marital_single}  onChange={this.handleInputChange} label="single" />
                          <Checkbox number="marital_unknown" checked={this.state.marital_unknown}  onChange={this.handleInputChange} label="unknown" />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-culture text-success" />&nbsp;&nbsp;Education</ControlLabel>
                          <Checkbox number="education_basic_4y" checked={this.state.education_basic_4y}  onChange={this.handleInputChange} label="basic_4y" />
                          <Checkbox number="education_basic_6y" checked={this.state.education_basic_6y}  onChange={this.handleInputChange} label="basic_6y" />
                          <Checkbox number="education_basic_9y" checked={this.state.education_basic_9y}  onChange={this.handleInputChange} label="basic_9y" />
                          <Checkbox number="education_high_school" checked={this.state.education_high_school}  onChange={this.handleInputChange} label="high_school" />
                          <Checkbox number="education_illiterate" checked={this.state.education_illiterate}  onChange={this.handleInputChange} label="illiterate" />
                          <Checkbox number="education_professional_course" checked={this.state.education_professional_course}  onChange={this.handleInputChange} label="pro._course" />
                          <Checkbox number="education_university_degree" checked={this.state.education_university_degree}  onChange={this.handleInputChange} label="uni._degree" />
                          <Checkbox number="education_unknown" checked={this.state.education_unknown}  onChange={this.handleInputChange} label="unknown" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-gleam text-info" />&nbsp;&nbsp;Default</ControlLabel>
                          <Checkbox number="default_no" checked={this.state.default_no}  onChange={this.handleInputChange} label="no" />
                          <Checkbox number="default_yes" checked={this.state.default_yes}  onChange={this.handleInputChange} label="yes" />
                          <Checkbox number="default_unknown" checked={this.state.default_unknown}  onChange={this.handleInputChange} label="unknown" />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-home text-secondary" />&nbsp;&nbsp;Housing</ControlLabel>
                          <Checkbox number="housing_no" checked={this.state.housing_no}  onChange={this.handleInputChange} label="no" />
                          <Checkbox number="housing_yes" checked={this.state.housing_yes}  onChange={this.handleInputChange} label="yes" />
                          <Checkbox number="housing_unknown" checked={this.state.housing_unknown}  onChange={this.handleInputChange} label="unknown" />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-help2 text-primary" />&nbsp;&nbsp;Loan</ControlLabel>
                          <Checkbox number="loan_no" checked={this.state.loan_no}  onChange={this.handleInputChange} label="no" />
                          <Checkbox number="loan_yes" checked={this.state.loan_yes}  onChange={this.handleInputChange} label="yes" />
                          <Checkbox number="loan_unknown" checked={this.state.loan_unknown}  onChange={this.handleInputChange} label="unknown" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                }
              />
              <Card
                title="Social and Economic Context"
                content={
                  <div>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-graph2 text-primary" />&nbsp;&nbsp;Employment Variation Rate (Quarterly)</ControlLabel>
                          <Slider
                            id="emp_var_rate"
                            min={-3.4}
                            max={1.4}
                            step={0.1}
                            value={this.state.emp_var_rate}
                            onChange={this.handleSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-graph1 text-secondary" />&nbsp;&nbsp;Cunsumer Price Index (Monthly)</ControlLabel>
                          <Slider
                            id="cons_price_idx"
                            min={92.201}
                            max={94.767}
                            step={0.05}
                            value={this.state.cons_price_idx}
                            onChange={this.handleSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-graph text-info" />&nbsp;&nbsp;Consumer Confidence Index (Monthly)</ControlLabel>
                          <Slider
                            id="cons_conf_idx"
                            min={-50.8}
                            max={-26.9}
                            step={0.1}
                            value={this.state.cons_conf_idx}
                            onChange={this.handleSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-edit text-success" />&nbsp;&nbsp;Euribor 3 Month Rate (Daily)</ControlLabel>
                          <Slider
                            id="euribor3m"
                            min={0.634}
                            max={5.045}
                            step={0.05}
                            value={this.state.euribor3m}
                            onChange={this.handleSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-user-female text-danger" />&nbsp;&nbsp;# of Employees (Quarterly)</ControlLabel>
                          <Slider
                            id="nr_employed"
                            min={4963.6}
                            max={5228.1}
                            step={5}
                            value={this.state.nr_employed}
                            onChange={this.handleSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="Last Contact of Current Campaign"
                content={
                  <div>
                    <Row>
                      <Col md={3}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-headphones text-danger" />&nbsp;&nbsp;Contact</ControlLabel>
                          <Checkbox number="contact_cellular" checked={this.state.contact_cellular}  onChange={this.handleInputChange} label="cellular" />
                          <Checkbox number="contact_telephone" checked={this.state.contact_telephone}  onChange={this.handleInputChange} label="telephone" />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-display1 text-success" />&nbsp;&nbsp;Month</ControlLabel>
                          <Checkbox number="month_jan" checked={this.state.month_jan}  onChange={this.handleInputChange} label="jan" />
                          <Checkbox number="month_feb" checked={this.state.month_feb}  onChange={this.handleInputChange} label="feb" />
                          <Checkbox number="month_mar" checked={this.state.month_mar}  onChange={this.handleInputChange} label="mar" />
                          <Checkbox number="month_apr" checked={this.state.month_apr}  onChange={this.handleInputChange} label="apr" />
                          <Checkbox number="month_may" checked={this.state.month_may}  onChange={this.handleInputChange} label="may" />
                          <Checkbox number="month_jun" checked={this.state.month_jun}  onChange={this.handleInputChange} label="jun" />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup controlId="">
                          <ControlLabel></ControlLabel>
                          <Checkbox number="month_jul" checked={this.state.month_jul}  onChange={this.handleInputChange} label="jul" />
                          <Checkbox number="month_aug" checked={this.state.month_aug}  onChange={this.handleInputChange} label="aug" />
                          <Checkbox number="month_sep" checked={this.state.month_sep}  onChange={this.handleInputChange} label="sep" />
                          <Checkbox number="month_oct" checked={this.state.month_oct}  onChange={this.handleInputChange} label="oct" />
                          <Checkbox number="month_nov" checked={this.state.month_nov}  onChange={this.handleInputChange} label="nov" />
                          <Checkbox number="month_dec" checked={this.state.month_dec}  onChange={this.handleInputChange} label="dec" />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-date text-primary" />&nbsp;&nbsp;Day of Week</ControlLabel>
                          <Checkbox number="day_of_week_mon" checked={this.state.day_of_week_mon}  onChange={this.handleInputChange} label="mon" />
                          <Checkbox number="day_of_week_tue" checked={this.state.day_of_week_tue}  onChange={this.handleInputChange} label="tue" />
                          <Checkbox number="day_of_week_wed" checked={this.state.day_of_week_wed}  onChange={this.handleInputChange} label="wed" />
                          <Checkbox number="day_of_week_thu" checked={this.state.day_of_week_thu}  onChange={this.handleInputChange} label="thu" />
                          <Checkbox number="day_of_week_fri" checked={this.state.day_of_week_fri}  onChange={this.handleInputChange} label="fri" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-hourglass text-info" />&nbsp;&nbsp;Duration</ControlLabel>
                          <Slider
                            id="duration"
                            min={0}
                            max={4918}
                            step={50}
                            value={this.state.duration}
                            onChange={this.handleSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                }
              />
              <Card
                title="Campaign General"
                content={
                  <div>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-mail text-primary" />&nbsp;&nbsp;# of Contacts during This Campaign</ControlLabel>
                          <Slider
                            id="campaign"
                            min={1}
                            max={56}
                            value={this.state.campaign}
                            onChange={this.handleSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-mail-open text-success" />&nbsp;&nbsp;# of Days Passed by</ControlLabel>
                          <Slider
                            id="pdays"
                            min={0}
                            max={999}
                            step={10}
                            value={this.state.pdays}
                            onChange={this.handleSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-mail-open-file text-secondary" />&nbsp;&nbsp;# of Contacts of Previous Campaigns</ControlLabel>
                          <Slider
                            id="previous"
                            min={0}
                            max={7}
                            value={this.state.previous}
                            onChange={this.handleSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-vector text-info" />&nbsp;&nbsp;# of Contacts of Previous Campaigns</ControlLabel>
                          <Row>
                            <Col md={4}>
                              <Checkbox number="poutcome_failure" checked={this.state.poutcome_failure}  onChange={this.handleInputChange} label="failure" />
                            </Col>
                            <Col md={4}>
                              <Checkbox number="poutcome_nonexistent" checked={this.state.poutcome_nonexistent}  onChange={this.handleInputChange} label="nonexistent" />
                            </Col>
                            <Col md={4}>
                              <Checkbox number="poutcome_success" checked={this.state.poutcome_success}  onChange={this.handleInputChange} label="success" />
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                }
              />
              <Card
                title="Output Variable"
                content={
                  <div>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="">
                          <ControlLabel><i className="pe-7s-ticket text-success" />&nbsp;&nbsp;Has the client subscribed a term deposit</ControlLabel>
                          <Row>
                            <Col md={6}>
                              <Checkbox number="y_yes" checked={this.state.y_yes}  onChange={this.handleInputChange} label="yes" />
                            </Col>
                            <Col md={6}>
                              <Checkbox number="y_no" checked={this.state.y_no}  onChange={this.handleInputChange} label="no" />
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div>
                          {
                            this.props.filteredRecordsLoading ? 
                              <p className="text-info text-center">Loading Requested Records...</p>
                            : 
                              <Button bsStyle="primary" onClick={this.queryData} block>Send Query and Save Data to Central Store</Button>
                          }
                        </div>
                      </Col>
                    </Row>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filteredRecordsLoading: state.filteredRecordsLoading
  }
}

export default connect(mapStateToProps)(DataQuery);
