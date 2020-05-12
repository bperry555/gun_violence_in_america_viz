from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import flask_marshmallow

app = Flask(__name__)

DATABASE = 'assets/data/clean_gunvio_vol4.sqlite' 

app.config['SQLALCHEMY_DATABASE_URI'] = 'assets/data/clean_gunvio_vol4.sqlite'

db = SQLAlchemy(app)




@app.route('/')
def index():
    return '/index.html'

if __name__== "__main__":
    app.run(debug=True)



 