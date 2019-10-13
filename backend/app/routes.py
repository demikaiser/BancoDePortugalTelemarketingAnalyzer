from app import app
from flask import jsonify, abort, request
from flask_restful import Resource

from app.database import db_session
from app.models import Record
from sqlalchemy import or_


@app.route('/', methods=['GET'])
def route_main():
    abort(404)
    return jsonify({'sample': 1})


class Records(Resource):
    """Endpoints for Returning Records.
    For the convenience, get_records will be with a post method because of the 
    large amount of parameters to process. They will be packaged up to a JSON
    object then passed to the endpoint for further processing. Other enpoints
    will operate as normal RESTful.
    """

    def post(self):
        json_data = request.get_json(force=True)
        return jsonify({ 'records': [ record.as_dict() for record in self.filters(json_data).all()] })

    def filters(self, json_data):
        query_applied = Record.query

        query_applied = query_applied.filter(json_data["age"][0] <= Record.age)
        query_applied = query_applied.filter(Record.age <= json_data["age"][1])

        query_applied = query_applied.filter(json_data["duration"][0] <= Record.duration)
        query_applied = query_applied.filter(Record.duration <= json_data["duration"][1])

        query_applied = query_applied.filter(json_data["campaign"][0] <= Record.campaign)
        query_applied = query_applied.filter(Record.campaign <= json_data["campaign"][1])

        query_applied = query_applied.filter(json_data["pdays"][0] <= Record.pdays)
        query_applied = query_applied.filter(Record.pdays <= json_data["pdays"][1])

        query_applied = query_applied.filter(json_data["previous"][0] <= Record.previous)
        query_applied = query_applied.filter(Record.previous <= json_data["previous"][1])

        query_applied = query_applied.filter(json_data["emp_var_rate"][0] <= Record.emp_var_rate)
        query_applied = query_applied.filter(Record.emp_var_rate <= json_data["emp_var_rate"][1])

        query_applied = query_applied.filter(json_data["cons_price_idx"][0] <= Record.cons_price_idx)
        query_applied = query_applied.filter(Record.cons_price_idx <= json_data["cons_price_idx"][1])

        query_applied = query_applied.filter(json_data["cons_conf_idx"][0] <= Record.cons_conf_idx)
        query_applied = query_applied.filter(Record.cons_conf_idx <= json_data["cons_conf_idx"][1])

        query_applied = query_applied.filter(json_data["euribor3m"][0] <= Record.euribor3m)
        query_applied = query_applied.filter(Record.euribor3m <= json_data["euribor3m"][1])

        query_applied = query_applied.filter(json_data["nr_employed"][0] <= Record.nr_employed)
        query_applied = query_applied.filter(Record.nr_employed <= json_data["nr_employed"][1])

        query_applied = query_applied.filter(or_(
            (Record.job == "admin." if json_data["job_admin"] else False), 
            (Record.job == "blue-collar" if json_data["job_blue_collar"] else False),
            (Record.job == "entrepreneur" if json_data["job_entrepreneur"] else False),
            (Record.job == "housemaid" if json_data["job_housemaid"] else False),
            (Record.job == "management" if json_data["job_management"] else False),
            (Record.job == "retired" if json_data["job_retired"] else False),
            (Record.job == "self-employed" if json_data["job_self_employed"] else False),
            (Record.job == "services" if json_data["job_services"] else False),
            (Record.job == "student" if json_data["job_student"] else False),
            (Record.job == "technician" if json_data["job_technician"] else False) ,
            (Record.job == "unemployed" if json_data["job_unemployed"] else False),
            (Record.job == "unknown" if json_data["job_unknown"] else False),
        ))

        query_applied = query_applied.filter(or_(
            (Record.marital == "divorced" if json_data["marital_divorced"] else False),
            (Record.marital == "married" if json_data["marital_married"] else False),
            (Record.marital == "single" if json_data["marital_single"] else False),
            (Record.marital == "unknown" if json_data["marital_unknown"] else False),
        ))

        query_applied = query_applied.filter(or_(
            (Record.education == "basic.4y" if json_data["education_basic_4y"] else False),
            (Record.education == "basic.6y" if json_data["education_basic_6y"] else False),
            (Record.education == "basic.9y" if json_data["education_basic_9y"] else False),
            (Record.education == "high.school" if json_data["education_high_school"] else False),
            (Record.education == "illiterate" if json_data["education_illiterate"] else False),
            (Record.education == "professional.course" if json_data["education_professional_course"] else False),
            (Record.education == "university.degree" if json_data["education_university_degree"] else False),
            (Record.education == "unknown" if json_data["education_unknown"] else False),
        ))

        query_applied = query_applied.filter(or_(
            (Record.default == "no" if json_data["default_no"] else False),
            (Record.default == "yes" if json_data["default_yes"] else False),
            (Record.default == "unknown" if json_data["default_unknown"] else False),
        ))

        query_applied = query_applied.filter(or_(
            (Record.housing == "no" if json_data["housing_no"] else False),
            (Record.housing == "yes" if json_data["housing_yes"] else False),
            (Record.housing == "unknown" if json_data["housing_unknown"] else False),
        ))

        query_applied = query_applied.filter(or_(
            (Record.loan == "no" if json_data["loan_no"] else False),
            (Record.loan == "yes" if json_data["loan_yes"] else False),
            (Record.loan == "unknown" if json_data["loan_unknown"] else False),
        ))

        query_applied = query_applied.filter(or_(
            (Record.contact == "cellular" if json_data["contact_cellular"] else False),
            (Record.contact == "telephone" if json_data["contact_telephone"] else False),
        ))

        query_applied = query_applied.filter(or_(
            (Record.month == "jan" if json_data["month_jan"] else False),
            (Record.month == "feb" if json_data["month_feb"] else False),
            (Record.month == "mar" if json_data["month_mar"] else False),
            (Record.month == "apr" if json_data["month_apr"] else False),
            (Record.month == "may" if json_data["month_may"] else False),
            (Record.month == "jun" if json_data["month_jun"] else False),
            (Record.month == "jul" if json_data["month_jul"] else False),
            (Record.month == "aug" if json_data["month_aug"] else False),
            (Record.month == "sep" if json_data["month_sep"] else False),
            (Record.month == "oct" if json_data["month_oct"] else False),
            (Record.month == "nov" if json_data["month_nov"] else False),
            (Record.month == "dec" if json_data["month_dec"] else False),
        ))

        query_applied = query_applied.filter(or_(
            (Record.day_of_week == "mon" if json_data["day_of_week_mon"] else False),
            (Record.day_of_week == "tue" if json_data["day_of_week_tue"] else False),
            (Record.day_of_week == "wed" if json_data["day_of_week_wed"] else False),
            (Record.day_of_week == "thu" if json_data["day_of_week_thu"] else False),
            (Record.day_of_week == "fri" if json_data["day_of_week_fri"] else False),
        ))

        query_applied = query_applied.filter(or_(
            (Record.poutcome == "failure" if json_data["poutcome_failure"] else False),
            (Record.poutcome == "nonexistent" if json_data["poutcome_nonexistent"] else False),
            (Record.poutcome == "success" if json_data["poutcome_success"] else False),
        ))

        query_applied = query_applied.filter(or_(
            (Record.y == "yes" if json_data["y_yes"] else False),
            (Record.y == "no" if json_data["y_no"] else False),
        ))

        return query_applied
 
























