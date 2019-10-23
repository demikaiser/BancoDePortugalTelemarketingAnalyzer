# Banco De Portugal Telemarketing Analyzer

## Introduction 

This is a full-stack machine learning suite for querying, processing, and training models for prediction. I have tried to touch the widest spectrum from accessing data to getting enough intuition to architect machine learning structure; however, it is simply not possible to cover all the permutations made of all the fields, parameters, and other factors. Fortunately, the application is designed in a way in which anyone can disassemble the parts and make more experiments from those individual components.

The data came from the official source -- see the reference page -- as a comma-separated-file; but for the convenience of the development and further data processing, the records are parsed and stored into the SQLite database. During the request cycle, the filtered records by the user's request are converted back to the tabular form to utilize the strength of the Pandas library. These diverse modules and formats can be used to further extend the functionalities to customize the use cases.

Various machine learning models are trained with the dataset and stored in the backend for making predictions from the user input. The most important purpose of this application is to explore and investigate the effects of the parameters and the attributes of the machine learning models, so the parameters and possible relationships are visualized to provide a deep understanding of the learning process. 

The backend application which holds the dataset and the learning models is connected to the frontend application which presents communication interfaces to the user with the RESTful APIs. Sometimes there are slight tweaks of the basic guidelines of the RESTful APIs for the purpose of the convenience, for example, getting records becomes a POST method in order to take advantage of a JSON body that has a large set of flags. In general, the RESTful principles are well-followed.

closing....here...

## Installation & Execution

### Frontend App

`$ npm install`

`$ npm start`

### Backend App

`$ pip3 install -r requirements.txt`

`$ python3 run.py`

## User Manual

### Data Query

- query data stored to the central store

- range sliders

- checkboxes

### Record Viewer

- red rows for "yes"

- Something 2

- Something 3

### Visualizer

- 

- Something 2

- Something 3







