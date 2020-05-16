from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///static/data/clean_gunvio_vol4.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

db.Model.metadata.reflect(db.engine)

class Incident(db.Model):
    __tablename__ = 'gun_vio_vol4'
    __table_args__ = { 'extend_existing' : True }
    incident_id = db.Column(db.TEXT, primary_key=True)

@app.route('/')
def hello():
        print('-------------', Incident.query.first.date,'-------------')
        return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)