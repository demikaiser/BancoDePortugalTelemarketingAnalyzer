# Banco De Portugal Telemarketing Analyzer

## Introduction 

This is a full-stack machine learning suite for querying, processing, and training models for prediction. I have tried to touch the widest spectrum from accessing data to getting enough intuition to architect machine learning structure; however, it is simply not possible to cover all the permutations made of all the fields, parameters, and other factors. Fortunately, the application is designed in a way in which anyone can disassemble the parts and make more experiments from those individual components.

The data came from the official source -- see the reference page -- as a comma-separated-file; but for the convenience of the development and further data processing, the records are parsed and stored into the SQLite database. During the request cycle, the filtered records by the user's request are converted back to the tabular form to utilize the strength of the Pandas library. These diverse modules and formats can be used to further extend the functionalities to customize the use cases.

Various machine learning models are trained with the dataset and stored in the backend for making predictions from the user input. The most important purpose of this application is to explore and investigate the effects of the parameters and the attributes of the machine learning models, so the parameters and possible relationships are visualized to provide a deep understanding of the learning process. 

The backend application which holds the dataset and the learning models is connected to the frontend application which presents communication interfaces to the user with the RESTful APIs. Sometimes there are slight tweaks of the basic guidelines of the RESTful APIs for the purpose of the convenience, for example, getting records becomes a POST method in order to take advantage of a JSON body that has a large set of flags. In general, the RESTful principles are well-followed.

## Installation & Execution

### Frontend App

The frontend is developed with React, Material UI, and third party styling templates. You can simply install the dependencies with npm and start the application:

`$ npm install`

`$ npm start`

### Backend App

The backend application is developed by using Python, Flask, Pandas, and Scikit for ML. See the requirements.txt file for the dependency list. Follow the instruction to run the application. If you are using a non-development environment where the server and the client are not on the same machine, the request URLs need to be changed:

`$ pip3 install -r requirements.txt`

`$ python3 run.py`

## User Manual

### Data Query

Data query executor helps users to selectively filter the data points which they are interested in. For the discrete fields, each constituting value can be chosen to be included; for the continuous fields, a range of values needs to be defined to fetch the data points existing in between the minimum value and the maximum value from the data query. It's important to choose at least one value in the field (a significant range that contains at least one record for the continuous field) to be able to see the proper records for the query. Otherwise, the result will be an empty dataset.

### Record Viewer & Visualizer

Record visualizer displays various statistical indicators to represent the crucial information on each field. For the discrete fields, it shows absolute and relative frequency information to give a quantitative shape of the data. For the continues fields, it exhibits absolute frequency information by ranges (histogram) and analytical statistical indicators. The individual records can be seen in the record viewer to trace down and inspect the relationship between fiends in one record. The records with true labels will be highlighted in red.

### Machine Learning Models

Since the dataset is relatively small, the entire set is utilized to train machine learning models. These models are trained once and reused multiple times until the models are deleted to improve system performance. From the frontend request, the backend will return an evaluation result that contains accuracy, f1 score, hamming loss, Matthews coefficient, and a confusion matrix to show how successful the model predicted true labels. Two pie charts from the true labels and the prediction labels are displayed to provide how conservative the models make the prediction. The confusion matrix shows the absolute frequencies of a false negative, false positive, true negative, and true positive. The followings are the results from the logistic regression, SVM, nearest neighbors, decision tree, random forest, ADA boost.

## References

[1]“Material-UI: A popular React UI framework.” [Online]. Available: https://material-ui.com/. [Accessed: 05-Jan-2020].

[2]“NumPy — NumPy.” [Online]. Available: https://numpy.org/. [Accessed: 05-Jan-2020].

[3]“pandas - Google Search.” [Online]. Available: https://www.google.com/search?q=pandas&oq=pandas&aqs=chrome..69i57j35i39l2j0l5.1435j0j1&sourceid=chrome&ie=UTF-8. [Accessed: 05-Jan-2020].

[4]“React – A JavaScript library for building user interfaces.” [Online]. Available: https://reactjs.org/. [Accessed: 05-Jan-2020].

[5]“scikit-learn: machine learning in Python — scikit-learn 0.22.1 documentation.” [Online]. Available: https://scikit-learn.org/stable/. [Accessed: 05-Jan-2020].

[6]“UCI Machine Learning Repository: Bank Marketing Data Set.” [Online]. Available: https://archive.ics.uci.edu/ml/datasets/bank+marketing. [Accessed: 05-Jan-2020].

[7]“Welcome to Flask — Flask Documentation (1.1.x).” [Online]. Available: https://flask.palletsprojects.com/en/1.1.x/. [Accessed: 05-Jan-2020].




