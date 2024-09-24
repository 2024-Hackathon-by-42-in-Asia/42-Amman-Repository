'use client';

import React, { useEffect, useState } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';

const accessToken = '';

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
        </div>
      )}
    </div>
  );
};

export default MapComponent;
