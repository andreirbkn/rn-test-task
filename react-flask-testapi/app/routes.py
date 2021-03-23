from app import app
from flask import Flask, make_response,request, jsonify, send_file
from .models import Course, CourseFile, CourseRating
from sqlalchemy import *


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/static/images/<string:filename>')
def get_image(filename):
    _filename = 'static/images/' + filename
    return send_file(_filename, mimetype='image/jpg')

@app.route('/api/get_course', methods=['GET'])
def handle_courses():
    if request.method == 'GET':
        # http://192.168.1.183:5000/courses?page=1
        # start on pblic IP because of ios default security settings 
        page = request.args.get('page', 1, type=int)
        print(page)
        q = Course.query\
            .outerjoin(CourseRating, CourseRating.course_id==Course.id)\
            .outerjoin(CourseFile, CourseFile.course_id==Course.id)\
            .add_columns(
                Course.id, 
                Course.title, 
                Course.image_url, 
                func.sum(CourseFile.length), 
                func.avg(CourseRating.mark),
                func.count(CourseRating.mark))\
            .group_by(Course.id)\
            .paginate(
            page, app.config['POSTS_PER_SCROLL'], False)
            
        results = []

        for item in q.items:
             results.append({
                "id": item[1],
                "title": item[2],
                "image_url": item[3],
                "length": item[4].total_seconds() / 60 /60 if item[4] != None else 0,
                "avg": float(item[5] if item[5] != None else 0),
                "count": float(item[6] if item[6] != None else 0),
            })


        resp = make_response(jsonify(results))
        resp.headers['access-control-allow-origin'] = '*'

        return resp
