import numpy as np
import pandas as pd

import sqlite3 as sq


data = pd.read_csv('./backend/dataset/bank-additional-full.csv', delimiter=';')



sql_data = './bank.sqlite' #- Creates DB names SQLite
conn = sq.connect(sql_data)
cur = conn.cursor()
cur.execute('''DROP TABLE IF EXISTS bank''')
data.to_sql('bank', conn, if_exists='replace', index=True) # - writes the pd.df to SQLIte DB
pd.read_sql('select * from bank', conn)
conn.commit()
conn.close()






