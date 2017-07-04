from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
import time

app = Flask(__name__)
CORS(app)
api = Api(app)


projects = []
projects.append({ 'id': 1, 'title': 'leweb', 'path': '', 'autoDeploy': False, 'redeploying': False, 'rebuilding': False })
projects.append({ 'id': 2, 'title': 'boweb', 'path': '', 'autoDeploy': False, 'redeploying': False, 'rebuilding': False })
projects.append({ 'id': 3, 'title': 'cpweb', 'path': '', 'autoDeploy': False, 'redeploying': False, 'rebuilding': False })

class Projects(Resource):
    def get(self):
        return projects

class Project(Resource):
    def get(self, project_id):
        time.sleep(2)
        return {'hello': project_id}


api.add_resource(Projects, '/projects')
api.add_resource(Project, '/project/<int:project_id>')

if __name__ == '__main__':
    app.run(debug=True)
