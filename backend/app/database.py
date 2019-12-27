from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from os.path import dirname, join
from app import app_main


SQLITE_DB_FILE_PATH = "sqlite:///" + join(dirname(dirname(__file__)), "dataset/bank.sqlite")
engine = create_engine(SQLITE_DB_FILE_PATH, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))


Base = declarative_base()
Base.query = db_session.query_property()
Base.metadata.reflect(engine)


def init_db():
    """
    Import all modules here that might define models so that they will be 
    registered properly on the metadata. 
    Otherwise import them first before calling init_db().
    """
    import app.models
    Base.metadata.create_all(bind=engine)


@app_main.teardown_appcontext
def shutdown_session(exception=None):
    global db_session
    db_session.remove()


