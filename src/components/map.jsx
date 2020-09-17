import React from 'react';

export const Map = () => {
  return (
    <div className="map-cluster">
        <div className="map-cluster__map">
            <iframe
                className="map-iframe"
                src="https://www.google.com/maps/embed/v1/view?center=53.4250605,27.6971358&amp;zoom=10&amp;key=AIzaSyBWWZnqHV3asW7DM3yCQ0dxSHjj_J9LkwE&amp;language=en"
            >
            </iframe>
        </div>
        <div className="map-cluster__coordinates">
            <p>Latitude: 53°26'</p>
            <p>Longitude: 27°42'</p>
        </div>
    </div>
  );
}
