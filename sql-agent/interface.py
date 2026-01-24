from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

FASTAPI_URL = os.environ.get('FASTAPI_URL', 'http://localhost:5000')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/info')
def get_info():
    try:
        response = requests.get(f'{FASTAPI_URL}/')
        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/database')
def database_info():
    try:
        response = requests.get(f'{FASTAPI_URL}/database')
        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/query', methods=['POST'])
def query_database():
    try:
        data = request.get_json()
        question = data.get('question', '')
        
        response = requests.post(
            f'{FASTAPI_URL}/ask',
            params={'question': question}
        )
        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)