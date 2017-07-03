from flask import Flask
from flask_restful import Resource, Api
import time

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        time.sleep(2)
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)
