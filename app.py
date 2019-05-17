from flask import Flask, render_template, request, jsonify
import base64
from predict import predict_character


app = Flask(__name__)

#default route
@app.route('/')
def index():
    return render_template('index.html', data = {'status': False})


@app.route('/charrecognize', methods = ['POST'])
def predict():
	if request.method == 'POST':
		data = request.get_json()
		imagebase64 = data['image']
		imgbytes = base64.b64decode(imagebase64)
		with open("temp.jpg","wb") as temp:
			temp.write(imgbytes)
		result = predict_character('temp.jpg')

		return jsonify({
        	'prediction': result,
        	'status': True
    	})

if __name__ == "__main__":
    app.run(debug=True)