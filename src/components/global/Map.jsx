import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import React, { useState, useEffect, useRef } from "react";

const Map = ({ isLoaded, center }) => {
  const onLoadMarker = (marker) => {};
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