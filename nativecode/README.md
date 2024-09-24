# Car Emissions Calculator API

## Overview

This project consists of a Flask API that computes car emissions based on various parameters such as engine type, fuel efficiency, and distance. The API interacts with a C library to perform the necessary calculations and responds with a performance score.

## Technologies Used

- **Flask**: A lightweight WSGI web application framework for Python.
- **ctypes**: A foreign function interface for calling functions in DLLs or shared libraries.
- **C Library**: Custom C code compiled into a shared library (`libmylib.so`) that performs emission calculations.

## API Endpoints

### `POST /compute`

This endpoint calculates the performance score based on the following parameters:

- `engine_type` (string): Type of the engine (e.g., "petrol", "diesel").
- `fuel_efficiency` (float): Fuel efficiency of the car.
- `distance` (float): Distance traveled by the car.

### Request Example

```json
{
  "engine_type": "petrol",
  "fuel_efficiency": 30,
  "distance": 200
}
