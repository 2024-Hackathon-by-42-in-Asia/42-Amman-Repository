'use client';

import React, { useEffect, useState } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';

const accessToken = '';

const calculate_emissions = (engine_type, fuel_efficiency, distance) => {
  const fuel_consumed = fuel_efficiency * distance;
  let emissions = 0.0;
  if (engine_type === "petrol") {
    emissions = 2.31 * fuel_consumed;
  } else if (engine_type === "diesel") {
    emissions = 2.68 * fuel_consumed;
  } else if (engine_type === "electric") {
    emissions = 0.2 * (fuel_consumed / 1000);
  } else if (engine_type === "hybrid") {
    const petrol_usage = fuel_consumed * 0.5;
    const electric_usage = fuel_consumed * 0.5;
    emissions = (2.31 * petrol_usage) + (0.2 * electric_usage / 1000);
  } else {
    console.log("Invalid engine type.");
    return null;
  }
  return emissions;
};
const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 1.428627,
    longitude: 103.835870,
    zoom: 13,
  });

  const [restaurant, setRestaurant] = useState([103.835870, 1.428627]);
  const [customerOne, setCustomerOne] = useState([103.836053, 1.434898]);
  const [customerTwo, setCustomerTwo] = useState([103.837000, 1.432000]);
  const [distanceOne, setDistanceOne] = useState(null);
  const [distanceTwo, setDistanceTwo] = useState(null);
  const [routeDataOne, setRouteDataOne] = useState(null);
  const [routeDataTwo, setRouteDataTwo] = useState(null);
  const [engineType, setEngineType] = useState('petrol');
  const [fuelEfficiency, setFuelEfficiency] = useState(0.1);
  const [emissionsOne, setEmissionsOne] = useState(null);
  const [emissionsTwo, setEmissionsTwo] = useState(null);

  useEffect(() => {
    const getRoute = async (start, end, setRouteData, setDistance) => {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${accessToken}`
      );
      const json = await query.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      const routeDistance = data.distance / 1000;
      setDistance(routeDistance.toFixed(2));
      setRouteData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
      });
    };

    getRoute(restaurant, customerOne, setRouteDataOne, setDistanceOne);
    getRoute(restaurant, customerTwo, setRouteDataTwo, setDistanceTwo);
  }, [restaurant, customerOne, customerTwo]);

  useEffect(() => {
    if (distanceOne && distanceTwo && fuelEfficiency > 0) {
      const emissionsOne = calculate_emissions(engineType, fuelEfficiency, parseFloat(distanceOne));
      const emissionsTwo = calculate_emissions(engineType, fuelEfficiency, parseFloat(distanceTwo));
  
      setEmissionsOne(emissionsOne.toFixed(2));
      setEmissionsTwo(emissionsTwo.toFixed(2));
    }
  }, [distanceOne, distanceTwo, engineType, fuelEfficiency]);
  const routeLayerStyleOne = {
    id: 'routeOne',
    type: 'line',
    paint: {
      'line-color': '#ff0000', // Red color for the route to Customer One
      'line-width': 4,
    },
  };

  const routeLayerStyleTwo = {
    id: 'routeTwo',
    type: 'line',
    paint: {
      'line-color': '#0000ff', // Blue color for the route to Customer Two
      'line-width': 4,
    },
  };

  const circleRadius = (center, radiusKm) => {
    const circle = turf.circle(center, radiusKm, { units: 'kilometers' });
    return {
      type: 'Feature',
      geometry: circle.geometry,
    };
  };

  return (
    <div style={{ position: 'relative' }}>
      <Map
        initialViewState={viewport}
        style={{ width: '100%', height: '500px' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={accessToken}
        onMove={(evt) => setViewport(evt.viewState)}
      >
        <Marker
          longitude={restaurant[0]}
          latitude={restaurant[1]}
          draggable
          onDragEnd={(evt) => setRestaurant([evt.lngLat.lng, evt.lngLat.lat])}
          color="green"
        >
          <div>Restaurant</div>
        </Marker>

        <Marker
          longitude={customerOne[0]}
          latitude={customerOne[1]}
          draggable
          onDragEnd={(evt) => setCustomerOne([evt.lngLat.lng, evt.lngLat.lat])}
          color="blue"
        >
          <div>Customer One</div>
        </Marker>

        <Marker
          longitude={customerTwo[0]}
          latitude={customerTwo[1]}
          draggable
          onDragEnd={(evt) => setCustomerTwo([evt.lngLat.lng, evt.lngLat.lat])}
          color="blue"
        >
          <div>Customer Two</div>
        </Marker>

        {routeDataOne && (
          <Source id="routeOneSource" type="geojson" data={routeDataOne}>
            <Layer {...routeLayerStyleOne} />
          </Source>
        )}

        {routeDataTwo && (
          <Source id="routeTwoSource" type="geojson" data={routeDataTwo}>
            <Layer {...routeLayerStyleTwo} />
          </Source>
        )}

        <Source id="circle-1km" type="geojson" data={circleRadius(restaurant, 1)}>
          <Layer id="circle-1km-fill" type="fill" paint={{ 'fill-color': '#00f', 'fill-opacity': 0.4 }} />
        </Source>
        <Source id="circle-2.5km" type="geojson" data={circleRadius(restaurant, 2.5)}>
          <Layer id="circle-2.5km-fill" type="fill" paint={{ 'fill-color': '#0f0', 'fill-opacity': 0.4 }} />
        </Source>

      </Map>

      {distanceOne && distanceTwo && (
        <div className="distance-display">
          <h3>Driving distance between restaurant and Customer One: {distanceOne} km</h3>
          <h3>Driving distance between restaurant and Customer Two: {distanceTwo} km</h3>
          {emissionsOne && <h3>Carbon footprint for Customer One: {emissionsOne} grams CO2</h3>}
          {emissionsTwo && <h3>Carbon footprint for Customer Two: {emissionsTwo} grams CO2</h3>}
        </div>
      )}
    </div>
  );
};

export default MapComponent;
