import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const GoogleMap = ({ children, ...props }) => (
  <Wrapper>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: "AIzaSyAqn-nn-CHr_xyrDrL60C-N9iY1cG2A4lI"
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </Wrapper>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

GoogleMap.defaultProps = {
  children: null
};

const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach(place => {
    bounds.extend(
      new maps.LatLng(place.geometry.location.lat, place.geometry.location.lng)
    );
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, "idle", () => {
    maps.event.addDomListener(window, "resize", () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

export default function Home() {
  return (
    <>
      <h1>fsdfds</h1>
      <GoogleMap
        defaultZoom={10}
        //defaultCenter={LOS_ANGELES_CENTER}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, [])}
      >
        {/* {places.map(place => (
        <Marker
          key={place.id}
          text={place.name}
          lat={place.geometry.location.lat}
          lng={place.geometry.location.lng}
        />
      ))} */}
      </GoogleMap>
    </>
  );
}
