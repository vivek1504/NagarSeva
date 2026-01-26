import os
from dotenv import load_dotenv
import getpass
from langchain.chat_models import init_chat_model
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
import pathlib
import sys
import requests
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain.agents import create_agent
from prompt import GetPrompt
from sqlalchemy import select,inspect,create_engine
from langchain_groq import ChatGroq

# load environment variables
load_dotenv()

# load model
def load_model():
  model_name='openai/gpt-oss-120b'
  key=os.environ.get('GROQ_API_KEY')
  if not key:
      return None,None
  model=ChatGroq(
    model=model_name,
    api_key=key
  )
  return model,{'Model':model_name}

# load database
def load_database():
    url=os.environ.get('DATABASE_URL')
    try:
        engine=create_engine(url)
        if engine:
           print('DataBase connected')
        else:
           print('Failed to connect database')
    except Exception as e:
            print(f'Failed due to error {e}')
    return SQLDatabase(engine)

# get db
def db():
    if not pathlib.Path('Chinook.db').exists():
        if load_database()==200:
           db=SQLDatabase.from_uri('sqlite:///Chinook.db')
           return db
        else:
            return None
    return SQLDatabase.from_uri('sqlite:///Chinook.db')

# get toolkit
def getkit(database,model):
    if not database or not model:
        return -1
    toolkit=SQLDatabaseToolkit(db=database,llm=model)
    return toolkit
        
# create agent
def AgentCreate(model,tools,database):
    prompt=GetPrompt(database)
    agent=create_agent(model,tools,system_prompt=prompt)
    return agent

# ask llm 
def AskQuestion(question,agent):
    result=None
    for step in agent.stream(
      {"messages": [{"role": "user", "content": question}]},
    stream_mode="values",
    ):
        result=step["messages"][-1]
    return result


if __name__=='__main__':
    
    # load openai model
    model,info=load_model()
    if not model:
        print(f'Failed to load model due to wrong API key or unavaliability of key')
    else:
        print(f"Sucessfully load the model: {info['Model']}")
    
    # # load database
    # status=load_database()
    # if status==200:
    #     print('File downloaded and loaded successfully')
    # else:
    #     print('Failed to read database from the given url')
    
    # get database
    database=load_database()
    if database:
        print(f'Dialect: {database.dialect}')
        print(f'Available tables: {database.get_usable_table_names()}')
    else:
        print(f'Failed to load database information')
    
    # load toolkit
    toolkit=getkit(database,model)
    tools=toolkit.get_tools()
    # if toolkit==-1:
    #     print('Failed load the tool kits')
    # else:
    #     print('Tools available are')
    #     tools=toolkit.get_tools()
    #     # for tool in tools:
    #     #     print(f'{tool.name}: {tool.description}\n')
    
    # load agent
    agent=AgentCreate(model,tools,database)
    
    # ask question
    question="What is the current progress and condition of our city?"
    AskQuestion(question,agent)
    
    
    
    