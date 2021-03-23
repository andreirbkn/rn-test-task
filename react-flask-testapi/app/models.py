from app import db

class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)    
    
    course_files = db.relationship("CourseFile", backref='course')
    course_ratings = db.relationship("CourseRating", backref='course')
    
    title = db.Column(db.Text, index=True, nullable=False)
    image_url = db.Column(db.Text, index=True)

    def __repr__(self):
        return '<Course {}>'.format(self.title)  
    

class CourseFile(db.Model):
    __tablename__ = 'course_files'

    id = db.Column(db.Integer, primary_key=True)
    
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)

    filename = db.Column(db.Text, index=True, nullable=False)
    length = db.Column(db.Time, index=True, nullable=False)
    


class CourseRating(db.Model):
    __tablename__ = 'course_ratings'
    
    id = db.Column(db.Integer, primary_key=True)

    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    mark = db.Column(db.Integer, nullable=False)

    def __init__(self, name, model, doors):
        self.name = name
        self.model = model
        self.doors = doors 
