from flask import Flask
from flask_restful import Resource, Api
import time

app = Flask(__name__)
api = Api(app)


projects = []
projects.append({ 'id': 1, 'name': 'leweb', 'path': '', 'autoDeploy': False, 'redeploying': False, 'rebuilding': False })
projects.append({ 'id': 2, 'name': 'boweb', 'path': '', 'autoDeploy': False, 'redeploying': False, 'rebuilding': False })
projects.append({ 'id': 3, 'name': 'cpweb', 'path': '', 'autoDeploy': False, 'redeploying': False, 'rebuilding': False })

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
