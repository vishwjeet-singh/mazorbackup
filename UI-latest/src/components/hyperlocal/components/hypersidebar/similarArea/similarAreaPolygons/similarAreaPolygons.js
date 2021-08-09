import React, { useEffect, useState } from 'react';
import ReactMapGL, { Source, Layer } from "react-map-gl"
import './similarAreaPolygons.css';

const SimilarAreaPolygons = ({ similarPolygonCenter, similarPolygons }) => {
    const fullscreenControlStyle = {
        right: 0,
        top: 0
    };

    const [viewport, setViewport] = useState({
        latitude: 12.97,
        longitude: 77.60067691802979,

        zoom: 10,
        width: '88%',
        height: '500px'
    })

    useEffect(() => {
        if (similarPolygonCenter) {
            setViewport({
                latitude: similarPolygonCenter.lat,
                longitude: similarPolygonCenter.lng,

                zoom: 13,
                width: '88%',
                height: '500px'
            })
        }
        else {
            setViewport(viewport); // everytime we zoom in or out the value gets updated
        }
    }, [similarPolygonCenter, similarPolygons])


    
    // mapbox://styles/mapbox/streets-v11 (earlier version of maptile)
    return (
        <ReactMapGL {...viewport}
            mapboxApiAccessToken="pk.eyJ1IjoiYXBvb3J2ZTczIiwiYSI6ImNrb3RxYW1wYjBlMDgycW13cnU4MHphYzgifQ.zDI-mD9HRgQ78sJZsTb6vw"
            mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
           className="similarareapolygonborder"
            onViewportChange={viewport => {
                setViewport(viewport)
            }}>

            {/* <FullscreenControl style={fullscreenControlStyle} /> */}
            {similarPolygons?
                <>
                 
                    
                {similarPolygons.map((val,index)=>(
                        <Source
                          id={`${index}`}
                          type="geojson"
                          data={similarPolygons[index]}
                
                        >
                            <Layer
                              id={`${index}`}
                              type="fill"
                              source="new"
                              paint={{
                                  "fill-color": 'red',
                                  "fill-opacity": 0.33,
                              }}
                                
                            />

                            <Layer
                                id={`${index}`}
                                type="line"
                                source="new"
                                paint={{
                                    'line-color': '#c20202',
                                    'line-width': 3
                                }}
                            />

                        </Source>
                     ))}
                </>
                : null}
                </ReactMapGL>
    );
}
            // 9306750422
export default SimilarAreaPolygons