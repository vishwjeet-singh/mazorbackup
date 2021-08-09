import React, { useEffect, useState } from 'react';
import ReactMapGL, { Source, Layer} from "react-map-gl"

const Map = ({ coordinates, city }) => {
  const data = "https://raw.githubusercontent.com/Apoorve73/Test_Repo_1/main/data.json"

  const fullscreenControlStyle = {
    right: 0,
    top: 0
  };

  const [geojson, setGeoJson] = useState(null)

  const [viewport, setViewport] = useState({
    latitude: 12.97,
    longitude: 77.60067691802979,

    zoom: 10,
    width: '95%',
    height: '429px'
  })

  useEffect(() => {
    if (coordinates) {
      setViewport({
        latitude: coordinates[2][1],
        longitude: coordinates[2][0],
        zoom: 17,
        width: '95%',
        height: '429px'
      })

      setGeoJson({
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [coordinates]
        },
        "properties": {
          "color": "#08519c",
          "fill": "#08519c",
          "fill-opacity": 0.33,
          "fillColor": "#08519c",
          "fillOpacity": 0.33,
          "opacity": 0.33
        }
      })
    }
    else {
      console.log('foot-insights map re-centering coordinates : null');
      setViewport(viewport); // everytime we zoom in or out the value gets updated
    }
  }, [coordinates])
// mapbox://styles/mapbox/streets-v11 (earlier version of maptile)
  return (
    <ReactMapGL {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiYXBvb3J2ZTczIiwiYSI6ImNrb3RxYW1wYjBlMDgycW13cnU4MHphYzgifQ.zDI-mD9HRgQ78sJZsTb6vw"
      mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
	  
      onViewportChange={viewport => {
        setViewport(viewport)
      }}>

      {/* <FullscreenControl style={fullscreenControlStyle} /> */}

      <Source
        id="new"
        type="geojson"
        data={geojson}
      >
        <Layer
          id='default'
          type="fill"
          source="new"
          paint={{
            "fill-color": 'blue',
            "fill-opacity": 0.33,
          }}
        />

      </Source>
    </ReactMapGL>
  );
}
// 9306750422
export default Map;
