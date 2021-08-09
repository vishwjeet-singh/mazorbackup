import React, { useEffect, useState } from 'react';
import ReactMapGL, { Source, Layer, Marker, FullscreenControl } from "react-map-gl"
import Pin from '../hyperlocal/components/hypersidebar/connectivity/connectivityMap/pin'
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './majorpath.css'


const MajorPathTaken = ({ markercoord, pathGeoJson }) => {
   
	const Tooltipinfo = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
	
  },
}))(Tooltip);

    const [viewport, setViewport] = useState({
        latitude: 12.97,
        longitude: 77.60067691802979,

        zoom: 10,
        width: '88%',
        height: '500px'
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
            "type": "LineString",
            "coordinates": [

            ]
        }

    })

    const fullscreenControlStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
    };

    useEffect(() => {
        if (markercoord) {
            console.log("Recentering major path's viewport");
            setViewport({
                latitude: markercoord[0][1],
                longitude: markercoord[0][0],

                zoom: 12,
                width: '88%',
                height: '500px'
            })
        }
        else {
            console.log('major path taken re-centering coordinates are null');
            setViewport(viewport)
        }
    }, [markercoord])

    useEffect(() => {
        if (pathGeoJson) {
            console.log(pathGeoJson);
        }
        else {
            console.log('pathGeoJson is null');
        }
    }, [pathGeoJson])


    return (
        <div id='section3' className='major-paths-taken'>
            <div className='trade-area-heading'>
                <div className='first-line'>
                    <div className='left'>	
		<Tooltipinfo  placement="right"
        title={
          <React.Fragment>
            <Typography color="inherit">Major Paths</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
		 <p className='heading'>
        <div className='heading-text'>Major Paths</div> <InfoIcon />
		 </p>           
	</Tooltipinfo>       
        </div>

                    <div className='right'>
                        <p className='date'></p><img className='icon' src="https://img.icons8.com/material/32/000000/sort-down--v1.png" />
                        <img src="https://img.icons8.com/windows/32/000000/share-2.png" className='icon' />
                        <img className='icon' src="https://img.icons8.com/windows/32/000000/download.png" />
                    </div>
                </div>
            </div>

            <ReactMapGL {...viewport}
                mapboxApiAccessToken="pk.eyJ1IjoiYXBvb3J2ZTczIiwiYSI6ImNrb3RxYW1wYjBlMDgycW13cnU4MHphYzgifQ.zDI-mD9HRgQ78sJZsTb6vw"
                mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
                className="majorborder"
                onViewportChange={viewport => {
                    setViewport(viewport)
                }}>
                {markercoord ? <Marker className='marker' longitude={markercoord[0][0]} latitude={markercoord[0][1]} ><Pin /></Marker> : null}
                {/* <FullscreenControl style={fullscreenControlStyle} /> */}

                {pathGeoJson ?
                    pathGeoJson.map((lineGeoJson,index) => (
                        <Source
                            id={`${index}`}
                            type="geojson"
                            data={lineGeoJson}
                        >
                            <Layer
                                id={`${index}`}
                                type="line"
                                source={`${index}`}
                                paint={{
                                    'line-color': '#08519c',
                                    'line-width': 0.5
                                }}
                            />

                        </Source>
                    ))
                    : null}


            </ReactMapGL>
        </div>
    );
}

export default MajorPathTaken
