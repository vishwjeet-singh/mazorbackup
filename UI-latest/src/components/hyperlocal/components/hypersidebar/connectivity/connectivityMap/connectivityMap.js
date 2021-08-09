import React, { useEffect, useState  } from 'react';
import ReactMapGL, { Source, Layer, Marker} from "react-map-gl"
import Pin from './pin'

const ConnectivityMap = ({ recenterPos, coordinates }) => {
    //initial viewport/center when map loads for the first time (used Mapbox here)
    const [viewport, setViewport] = useState({
        latitude: 12.95,
        longitude: 77.60067691802979,

        zoom: 10,
        width: '95%',
        height: '100%'
    })


    const [geojson, setGeoJson] = useState({
        "type": "Feature",
        "properties": {
            "fill": "#08519c",
            "fillOpacity": 0.33,
            "fill-opacity": 0.33,
            "fillColor": "#08519c",
            "color": "#08519c",
            "opacity": 1,
            "metric": "time"
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [

            ]
        }

    })


    useEffect(() => {
        if (recenterPos) {
            console.log(recenterPos);
            //recentering to our selected place
            setViewport({
                latitude: recenterPos.lat,
                longitude: recenterPos.lng,

                zoom: 12.5,
                width: '95%',
                height: '100%'
            })
        }
        else {
            console.log('markerobject prop is null');
            setViewport(viewport)
        }
    }, [recenterPos])

    useEffect(() => {
        if (coordinates) {
            //setting the geojson variable to the polygon value which we want to display (isochrone api fetches the 'coordinates' variable)
            setGeoJson({
                "type": "Feature",
                "properties": {
                    "fill": "#08519c",
                    "fillOpacity": 0.33,
                    "fill-opacity": 0.33,
                    "fillColor": "#08519c",
                    "color": "#08519c",
                    "opacity": 1,
                    "metric": "time"
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates":[coordinates] 
                }
        
            })
        }
        else {
            console.log('isochrone geojson response is null');
            setGeoJson(geojson)
        }
    }, [coordinates])


    return (
        <ReactMapGL {...viewport}
            mapboxApiAccessToken="pk.eyJ1IjoiYXBvb3J2ZTczIiwiYSI6ImNrb3RxYW1wYjBlMDgycW13cnU4MHphYzgifQ.zDI-mD9HRgQ78sJZsTb6vw"
            mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
            onViewportChange={viewport => {
                setViewport(viewport)
            }}>

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
                        "fill-color": '#08519c',
                        "fill-opacity": 0.33,
                    }}
                />

                <Layer
                    id='outline'
                    type="line"
                    source="new"
                    paint={{
                        'line-color': '#08519c',
                        'line-width': 3
                    }}
                />
            </Source>

            {recenterPos ? <Marker  className='marker' longitude={recenterPos.lng} latitude={recenterPos.lat} ><Pin /></Marker> : null}
        </ReactMapGL>
    );
}
export default ConnectivityMap
