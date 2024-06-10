# Import required dependencies
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Define SQLite Database File Path
DATABASE_URL = "sqlite:///./concrete_labs.db"

# Create Database Engine To Connect To SQLite Database
engine = create_engine(url=DATABASE_URL, connect_args={"check_same_thread": False})

# Create Database Session To Manage Sessions
LocalSession = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()