import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useState, useEffect, useRef } from "react";

const Map = ({ center }) => {
  const onLoadMarker = (marker) => {};
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY,
  });
  return (
    <div className="Map lg:w-[20%] ">
      {!isLoaded ? (
        <h3>Loading…..</h3>
      ) : (
        <GoogleMap
          mapContainerClassName="map_container"
          center={center}
          zoom={10}
        >
          <MarkerF position={center} onLoad={onLoadMarker} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
