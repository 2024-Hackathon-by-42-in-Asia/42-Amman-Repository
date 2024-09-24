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
  const [closestFirst, setClosestFirst] = useState([]);
  const [combinedRoute, setCombinedRoute] = useState(null);
  const [totalDistance, setTotalDistance] = useState(null);
  const [engineType, setEngineType] = useState('petrol');  // Default engine type
  const [fuelEfficiency, setFuelEfficiency] = useState(0.1);  // Fuel efficiency in liters/km
  const [carbonEmissions, setCarbonEmissions] = useState(null); // Carbon emissions in grams

  useEffect(() => {
    const getRoute = async (start, end) => {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${accessToken}`
      );
      const json = await query.json();
      const data = json.routes[0];
      return { coordinates: data.geometry.coordinates, distance: data.distance / 1000 };
    };

    const calculateRoutes = async () => {
      const distToCustomerOne = turf.distance(restaurant, customerOne);
      const distToCustomerTwo = turf.distance(restaurant, customerTwo);

      const customersSorted = distToCustomerOne < distToCustomerTwo
        ? [customerOne, customerTwo]
        : [customerTwo, customerOne];
      
      setClosestFirst(customersSorted);

      const routeToFirstCustomer = await getRoute(restaurant, customersSorted[0]);
      const routeToSecondCustomer = await getRoute(customersSorted[0], customersSorted[1]);

      const combinedCoordinates = [
        ...routeToFirstCustomer.coordinates,
        ...routeToSecondCustomer.coordinates
      ];
      const totalDistance = routeToFirstCustomer.distance + routeToSecondCustomer.distance;

      setTotalDistance(totalDistance.toFixed(2));
      setCombinedRoute({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: combinedCoordinates,
        },
      });

      // Calculate emissions
      const emissions = calculate_emissions(engineType, fuelEfficiency, totalDistance);
      setCarbonEmissions(emissions?.toFixed(2));
    };

    calculateRoutes();
  }, [restaurant, customerOne, customerTwo, engineType, fuelEfficiency]);

  const routeLayerStyle = {
    id: 'combinedRoute',
    type: 'line',
    paint: {
      'line-color': '#ff0000',
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

        {combinedRoute && (
          <Source id="combinedRouteSource" type="geojson" data={combinedRoute}>
            <Layer {...routeLayerStyle} />
          </Source>
        )}

        <Source id="circle-1km" type="geojson" data={circleRadius(restaurant, 1)}>
          <Layer id="circle-1km-fill" type="fill" paint={{ 'fill-color': '#00f', 'fill-opacity': 0.4 }} />
        </Source>
        <Source id="circle-2.5km" type="geojson" data={circleRadius(restaurant, 2.5)}>
          <Layer id="circle-2.5km-fill" type="fill" paint={{ 'fill-color': '#0f0', 'fill-opacity': 0.4 }} />
        </Source>
      </Map>

      {totalDistance && carbonEmissions && (
        <div className="distance-display">
          <h3>Total driving distance for the route: {totalDistance} km</h3>
          <h3>Expected carbon emissions: {carbonEmissions} grams</h3>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
