from typing import List
import pandas as pd
from app.models import Record


def get_statistics(records: List[Record]):
    """Calculates statistical descriptions for each column.
    """

    records_for_pandas = {
        "age": [],
        "campaign": [],
        "cons_conf_idx": [],
        "cons_price_idx": [],
        "contact": [],
        "day_of_week": [],
        "default": [],
        "duration": [],
        "education": [],
        "emp_var_rate": [],
        "euribor3m": [],
        "housing": [],
        "index": [],
        "job": [],
        "loan": [],
        "marital": [],
        "month": [],
        "nr_employed": [],
        "pdays": [],
        "poutcome": [],
        "previous": [],
        "y": [] 
    }

    for record in records:
        for key, value in record.as_dict().items():
            records_for_pandas[key].append(value)

    result = {
        "age": {
            "type": "numerical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "How old are the customers?",
        },
        "campaign": {
            "type": "numerical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "A number of contacts performed during this campaign and for this client.",
        },
        "cons_conf_idx": {
            "type": "numerical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Consumer confidence index - monthly indicator.",
        },
        "cons_price_idx": {
            "type": "numerical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Consumer price index - monthly indicator.",
        },
        "contact": {
            "type": "categorical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Contact communication type, either telephone or cellphone.",
        },
        "day_of_week": {
            "type": "categorical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Last contact day of week.",
        },
        "default": {
            "type": "categorical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Has credit of the customer in default?",
        },
        "duration": {
            "type": "numerical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Last contact duration in seconds.",
        },
        "education": {
            "type": "categorical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Final education of the customer.",
        },
        "emp_var_rate": {
            "type": "numerical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Employment variation rate - quarterly indicator.",
        },
        "euribor3m": {
            "type": "numerical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Euribor 3 month rate - daily indicator.",
        },
        "housing": {
            "type": "categorical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Does the customer have a housing loan?",
        },
        "job": {
            "type": "categorical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "What kind of job the customer has?",
        },
        "loan": {
            "type": "categorical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Does the customer have a loan?",
        },
        "marital": {
            "type": "categorical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Is the customer married?",
        },
        "month": {
            "type": "categorical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Last contact month of this year.",
        },
        "nr_employed": {
            "type": "numerical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "Number of employeees - quarterly indicator.",
        },
        "pdays": {
            "type": "numerical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "The number of days that passed by after the client was last contacted from a previous campaign.",
        },
        "poutcome": {
            "type": "categorical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "The outcome of the previous marketing campaign.",
        },
        "previous": {
            "type": "numerical",
            "graph": { "labels": [], "series": [[], []] },
            "description": {},
            "description_for_yes": {},
            "description_for_no": {},
            "explanation": "The number of contacts performed before this campaign and for this client.",
        },
    }

    df = pd.DataFrame(data=records_for_pandas)

    df_all = df.drop(['y', 'index'], axis=1)
    df_graphs = df.drop(['index'], axis=1)
    df_yes = df.loc[df['y'] == 'yes'].drop(['y', 'index'], axis=1)
    df_no = df.loc[df['y'] == 'no'].drop(['y', 'index'], axis=1)

    ############################################################################
    #                              Descriptions                                #
    ############################################################################

    description = df_all.describe(include=['object', 'float', 'int']).replace({pd.np.nan: None})
    get_description(result, description, "description")

    description_yes = df_yes.describe(include=['object', 'float', 'int']).replace({pd.np.nan: None})
    get_description(result, description_yes, "description_for_yes")

    description_no = df_no.describe(include=['object', 'float', 'int']).replace({pd.np.nan: None})
    get_description(result, description_no, "description_for_no")

    ############################################################################
    #                                 Graphs                                   #
    ############################################################################

    get_graphs(result, df_graphs, df_yes, df_no)

    return result


def get_graphs(result, df_all, df_yes, df_no):
    """Calculates data points for drawing graphs.

    All categorical variables will have the graph points as the same numbers 
    with the number of unique values. All numerical variables will have graph
    points of 10 for the frontend graph objects.
    """

    for column in df_all.columns:
        if column == 'y':
            continue
        elif result[column]["type"] == "numerical":
            df_yes_counts = [0] * 10
            df_no_counts = [0] * 10

            if df_no[column].__len__() == 0:
                df_yes_counts = df_yes[column].value_counts(bins=10, sort=False)
                result[column]["graph"] = {
                    "labels": [ str(column) for column in df_yes_counts.keys() ], 
                    "series": [
                        [ column for column in df_yes_counts ], 
                        [ column for column in df_no_counts ], 
                    ],
                }
            elif df_yes[column].__len__() == 0:
                df_no_counts = df_no[column].value_counts(bins=10, sort=False)
                result[column]["graph"] = {
                    "labels": [ str(column) for column in df_no_counts.keys() ], 
                    "series": [
                        [ column for column in df_yes_counts ], 
                        [ column for column in df_no_counts ], 
                    ],
                }
            else:
                df_yes_counts = df_yes[column].value_counts(bins=10, sort=False)
                df_no_counts = df_no[column].value_counts(bins=10, sort=False)
                result[column]["graph"] = {
                    "labels": [ str(column) for column in df_yes_counts.keys() ], 
                    "series": [
                        [ column for column in df_yes_counts ], 
                        [ column for column in df_no_counts ], 
                    ],
                }

        elif result[column]["type"] == "categorical":

            df_labels = []
            df_yes_counts = []
            df_no_counts = []

            for value in df_all[column].unique():
                df_labels.append(value)
                df_yes_counts.append(df_all[df_all[column] == value][df_all['y'] == 'yes'].shape[0])
                df_no_counts.append(df_all[df_all[column] == value][df_all['y'] == 'no'].shape[0])

            result[column]["graph"] = {
                "labels": df_labels,
                "series": [
                    df_yes_counts,
                    df_no_counts,
                ],
            }

    return result


def get_description(result, description, name):
    """Calculates statistics to give a cursory understanding of the data.

    Since the Pandas NaN type is not serializable to JSON objects, it converts
    it to the None type in Python, then to the null type in JSON objects.
    """

    for column in description:
        count = float(description[column]["count"]) if description[column]["count"] is not None else None
        unique = float(description[column]["unique"]) if description[column]["unique"] is not None else None
        top = str(description[column]["top"]) if description[column]["top"] is not None else None
        freq = float(description[column]["freq"]) if description[column]["freq"] is not None else None
        mean = float(description[column]["mean"]) if description[column]["mean"] is not None else None
        std = float(description[column]["std"]) if description[column]["std"] is not None else None
        min_ = float(description[column]["min"]) if description[column]["min"] is not None else None
        percent25 = float(description[column]["25%"]) if description[column]["25%"] is not None else None
        percent50 = float(description[column]["50%"]) if description[column]["50%"] is not None else None
        percent75 = float(description[column]["75%"]) if description[column]["75%"] is not None else None
        max_ = float(description[column]["max"]) if description[column]["max"] is not None else None

        result[column][name] = {
            "count": count,
            "unique": unique,
            "top": top,
            "freq": freq,
            "mean": mean,
            "std": std,
            "min": min_,
            "25%": percent25,
            "50%": percent50,
            "75%": percent75,
            "max": max_,
        }
