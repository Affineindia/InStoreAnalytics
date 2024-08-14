"""
@author  : Rakesh Roshan
@contact : rakesh.roshan@affineanalytics.com

A set of functions to start the API server and listen to the requests.
Returns the JSON output from running models and IOU their outputs.
"""
import sys
import json
import logging, os
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
# from results.traffic.Convert_CSV_to_Dictionary import csv_to_dictionary
sys.path.append('results/traffic')
from Convert_CSV_to_Dictionary import csv_to_dictionary
sys.path.append('results/pos_reports')
from WarehouseStorage import show_details




app = Flask(__name__)
CORS(app)
## Logs are logged into the server.log file.
file_handler = logging.FileHandler('server.log')
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)
PROJECT_HOME = os.path.dirname(os.path.realpath(__file__))


@app.route('/testpost', methods = ['POST'])
def api_root():
    app.logger.info('Project_Home:' + PROJECT_HOME)
    return "Test Post"

@app.route('/testget', methods = ['GET'])
def test_get():
    return "Test Get."



'''
Reads the output from the CSV file and returns in JSON format.
'''
@app.route('/api/getTrafficSummary', methods = ['GET'])
def getTrafficSummary():
  resp = csv_to_dictionary('results/traffic/Combined.csv')
  # print(resp)
  return jsonify(resp)


'''
Reads the json file with the specified file name.
'''
@app.route('/api/checkCounterfeit', methods = ['GET'])
def checkCounterfeit():
  filename = request.args.get('filename') + '.json'
  filepath = 'results/counterfeit/' + filename
  f = open(filepath,)
  resp = json.load(f)
  # print(resp)
  return jsonify(resp)


'''
Reads the json file with the specified file name.
'''
@app.route('/api/getEstimatedPos', methods = ['GET'])
def getEstimatedPos():
  filename = request.args.get('filename') + '.json'
  filepath = 'results/pos/' + filename
  f = open(filepath,)
  resp = json.load(f)
  # print(resp)
  return jsonify(resp)


@app.route('/api/getShelfInventoryData', methods = ['GET'])
def getShelfInventoryData():
  filepath = 'results/shelf/Shelf_Inventory.json'
  f = open(filepath,)
  resp = json.load(f)
  #print(resp)
  return jsonify(resp)


'''
Reads the json file with the specified file name and filters the data for the specified parameter values.
'''
@app.route('/api/getPosReportData', methods = ['GET'])
def getPosReportData():
  fromdate = request.args.get('from')
  todate = request.args.get('to')
  state = request.args.get('state')
  city = request.args.get('city')
  product = request.args.get('product').replace("_", " ")
  """
  products = ['Ambi Pur','Ariel','Head & Shoulders','Pantene','Purex','Tide','whisper']
  pid = request.args.get('product')
  if pid != '':
    pInd = int(pid) - 1
    product = products[pInd]
  else:
    product = ''
  product = 'Ariel'
  """
  filepath = r'results/pos_reports/PG_Global_Hackathon_Mockup_v5_1.xlsx'
  print(fromdate + ', ' + todate + ', ' + state + ', ' + city + ', ' + product + ', ' + filepath)
  resp = show_details(fromdate, todate, state, city, product, filepath)
  # resp = {'fromdatetime': fromdatetime, 'todatetime':todatetime, 'level':level, 'geography':geography, 'product':product}
  return jsonify(resp)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)
