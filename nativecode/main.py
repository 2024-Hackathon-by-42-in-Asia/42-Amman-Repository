import ctypes
from flask import Flask,jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
Clib = ctypes.CDLL("./libmylib.so")

Clib.calculate_emissions.argtypes = [ctypes.c_char_p, ctypes.c_float, ctypes.c_float]
Clib.calculate_emissions.restype = ctypes.c_float

@app.route("/compute", methods = ['POST'])
def compute():
    car_type = request.args.get('engine_type')
    horsepower = float(request.args.get('fuel_efficiency'))
    weight = float(request.args.get('distance'))
    
    car_type_bytes = car_type.encode('utf-8')
    if not car_type or horsepower is None or weight is None:
        return jsonify({"error": "Missing required parameters"}), 400
    
    
    performance = Clib.calculate_emissions(car_type_bytes, horsepower, weight)
    return jsonify({"performance_score": performance})


if __name__ == '__main__':
    app.run(debug=True)
