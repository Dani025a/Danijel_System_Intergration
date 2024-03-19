from flask import Flask, jsonify, send_file, request
import requests

app = Flask(__name__)

SERVER_A_URL = "http://localhost:5001"

@app.route('/data/xml', methods=['GET'])
def serve_xml():
    response = requests.get(f"{SERVER_A_URL}/get/xml")
    return response.content, response.status_code

@app.route('/data/csv', methods=['GET'])
def serve_csv():
    response = requests.get(f"{SERVER_A_URL}/get/csv")
    return response.content, response.status_code

@app.route('/data/yaml', methods=['GET'])
def serve_yaml():
    response = requests.get(f"{SERVER_A_URL}/get/yaml")
    return response.content, response.status_code

@app.route('/data/txt', methods=['GET'])
def serve_txt():
    response = requests.get(f"{SERVER_A_URL}/get/txt")
    return response.content, response.status_code

@app.route('/data/json', methods=['GET'])
def serve_json():
    response = requests.get(f"{SERVER_A_URL}/get/json")
    return response.content, response.status_code


@app.route('/get/xml', methods=['GET'])
def serve_get_xml():
    return send_file('../data/me.xml', mimetype='text/xml')

@app.route('/get/csv', methods=['GET'])
def serve_get_csv():
    return send_file('../data/me.csv', mimetype='text/csv')

@app.route('/get/yaml', methods=['GET'])
def serve_get_yaml():
    return send_file('../data/me.yaml', mimetype='text/yaml')

@app.route('/get/txt', methods=['GET'])
def serve_get_txt():
    return send_file('../data/me.txt', mimetype='text/plain')

@app.route('/get/json', methods=['GET'])
def serve_get_json():
    return send_file('../data/me.json', mimetype='application/json')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
