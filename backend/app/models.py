from datetime import datetime
from click import command, echo
from flask_sqlalchemy import SQLAlchemy
from flask.cli import with_appcontext
from sqlalchemy import Column, Integer, String
from app.database import Base

class Record(Base):
    """
    This class represents a record in the dataset. The dataset is about 
    the bank marketing with socio-economic factors.
    Details are described as the followings. The dataset is read-only.

    <Input variables>

    ====> bank client data:
    01 - age: (numeric) e.g., "age": 56
    02 - job: type of job (categorical: "admin.","blue-collar","entrepreneur",
        "housemaid","management","retired","self-employed","services","student",
        "technician","unemployed","unknown") e.g., "job": "housemaid"
    03 - marital : marital status (categorical: "divorced","married","single",
        "unknown"; note: "divorced" means divorced or widowed) 
        e.g., "marital": "married"
    04 - education (categorical: "basic.4y","basic.6y","basic.9y","high.school",
        "illiterate","professional.course","university.degree","unknown") 
        e.g., "education": "basic.4y"
    05 - default: has credit in default? (categorical: "no","yes","unknown") 
        e.g., "default": "no"
    06 - housing: has housing loan? (categorical: "no","yes","unknown") 
        e.g., "housing": "no"
    07 - loan: has personal loan? (categorical: "no","yes","unknown") 
        e.g., "loan": "no"

    ====> related with the last contact of the current campaign:
    08 - contact: contact communication type (categorical: "cellular",
        "telephone") e.g., "contact": "telephone"
    09 - month: last contact month of year (categorical: "jan", "feb", "mar", 
        ..., "nov", "dec") e.g., "month": "may"
    10 - day_of_week: last contact day of the week (categorical: "mon","tue",
        "wed","thu","fri") e.g., "day_of_week": "mon"
    11 - duration: last contact duration, in seconds (numeric). Important note:  
        this attribute highly affects the output target (e.g., if duration=0 
        then y="no"). Yet, the duration is not known before a call is performed. 
        Also, after the end of the call y is obviously known. Thus, this input 
        should only be included for benchmark purposes and should be discarded 
        if the intention is to have a realistic predictive model. 
        e.g., "duration": 261

    ====> other attributes:
    12 - campaign: number of contacts performed during this campaign and for 
        this client (numeric, includes last contact) e.g., "campaign": 1
    13 - pdays: number of days that passed by after the client was last 
        contacted from a previous campaign (numeric; 999 means client was not 
        previously contacted) e.g., "pdays": 999
    14 - previous: number of contacts performed before this campaign and for 
        this client (numeric) e.g., "previous": 0
    15 - poutcome: outcome of the previous marketing campaign (categorical: 
        "failure","nonexistent","success") e.g., "poutcome": "nonexistent"

    ====> social and economic context attributes
    16 - emp_var_rate: employment variation rate - quarterly indicator (numeric) 
        e.g., "emp_var_rate": 1.1
    17 - cons_price_idx: consumer price index - monthly indicator (numeric) 
        e.g., "cons_price_idx": 93.994
    18 - cons_conf_idx: consumer confidence index - monthly indicator (numeric) 
        e.g., "cons_conf_idx": -36.4
    19 - euribor3m: euribor 3 month rate - daily indicator (numeric) 
        e.g., "euribor3m": 4.857
    20 - nr_employed: number of employees - quarterly indicator (numeric) 
        e.g., "nr_employed": 5191.0

    <Output variable (desired target)>
    21 - y: has the client subscribed a term deposit? (binary: "yes","no") 
        e.g., "y": "no"

    <Database metadata>
    22 - index: this is a unique ID for the database e.g., "index": 312

    Citation: [Moro et al., 2014] S. Moro, P. Cortez and P. Rita. A Data-Driven 
        Approach to Predict the Success of Bank Telemarketing. Decision Support 
        Systems, In press, http://dx.doi.org/10.1016/j.dss.2014.03.001
    """  
    __table__ = Base.metadata.tables['bank']

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
