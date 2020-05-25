from flask import Flask, jsonify, render_template, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///static/data/clean_gunvio_vol4.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
ma = Marshmallow(app)

class Gun_vio_vol4(db.Model):
    incident_id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.TEXT)
    state = db.Column(db.TEXT)
    city_or_county = db.Column(db.TEXT)
    address = db.Column(db.TEXT)
    incident_url = db.Column(db.TEXT)
    latitude= db.Column(db.REAL)
    longitude = db.Column(db.REAL)
    age_group_Adult= db.Column(db.INTEGER)
    age_group_Teen = db.Column(db.INTEGER)
    age_group_Child= db.Column(db.INTEGER)
    Female = db.Column(db.INTEGER)
    Male = db.Column(db.INTEGER)
    Arrested= db.Column(db.INTEGER)
    Unharmed= db.Column(db.INTEGER)
    Killed = db.Column(db.INTEGER)
    Injured= db.Column(db.INTEGER)
    year = db.Column(db.INTEGER)

class IncidentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Gun_vio_vol4

incident_schema = IncidentSchema()
incidents_schema = IncidentSchema(many=True)

@app.route('/')
def home():
  return render_template('landingPage.html')

@app.route('/stateapi')
def apiHome():
  return render_template('api.html')


@app.route('/query', methods=['POST'])
def apiquery():
    
  req = request.get_json()

  print(req)

  user_query = Gun_vio_vol4.query.filter_by(year=req['year']).filter_by(state=req['state']).limit(1000).all()
  user_result = incidents_schema.dump(user_query)

  return jsonify(user_result)


if __name__ == '__main__':
    app.run(debug=True)
