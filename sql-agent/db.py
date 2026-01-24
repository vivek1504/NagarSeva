
import requests 
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy import select,inspect

url="postgresql://neondb_owner:npg_tgTDo7yIKHb3@ep-long-math-a1p0i83z-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
try:
    engine=create_engine(url,
                         echo=True)
    if engine:
        print('DataBase connected')
    else:
        print('Failed to connect database')
except Exception as e:
    print(f'Failed due to error {e}')

session=Session(engine)
inspection=inspect(engine)
tables=inspection.get_table_names()
columns=inspection.get_columns('Ward')
