#import os
#basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):

    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:postgres@localhost:5432/courses_api"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    POSTS_PER_SCROLL = 10
    JSONIFY_PRETTYPRINT_REGULAR = True