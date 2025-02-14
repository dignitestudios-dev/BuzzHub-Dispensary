import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React from "react";

const Map = ({ isLoaded, center }) => {
  const onLoadMarker = (marker) => {};

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="Map lg:w-[100%]">
      <GoogleMap
        mapContainerClassName="map_container"
        center={center}
        zoom={10}
      >
        <MarkerF position={center} onLoad={onLoadMarker} />
      </GoogleMap>
    </div>
  );
};

export default Map;
