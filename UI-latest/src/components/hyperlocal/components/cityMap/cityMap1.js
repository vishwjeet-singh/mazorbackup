import './cityMap.css'
import { MapContainer, TileLayer, FeatureGroup, Polygon, Tooltip, } from 'react-leaflet'
import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet'
import osm from "../hyperMap/osm-provider";
import { scaleQuantile } from 'd3-scale';
// import '../../../../../node_modules/leaflet/dist/leaflet.css'
// import '../../../../../node_modules/leaflet-draw/dist/leaflet.draw.css'
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js"
import "leaflet-fullscreen/dist/leaflet.fullscreen.css"
import { EditControl } from "react-leaflet-draw"
import { Slider } from '@material-ui/core';
import LinearGradient from './LinearGradient.js';
import Grid from '@material-ui/core/Grid';
import * as h3 from 'h3-js'
import * as https from 'https';
import axios from "axios"


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});


const CityMap1 = () => {

    const geojson = {
        "type": "Feature",
        "properties": {
            "stroke": "#555555",
            "stroke-width": 2,
            "stroke-opacity": 1,
            "fill": "white",
            "fill-opacity": 0.1,
            "Name ": "Jayanagar"
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [

            ]
        }
    }


    /* Green Gradient
    const COLOR_RANGE = [
        '#FFFFE5',
        '#F7FCB9',
        '#D9F0A3',
        '#ADDD8E',
        '#78C679',
        '#41AB5D',
        '#238443',
        '#006837',
        '#004529'
    ];
    */
   // Red Variants
  const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
  ];

    const [center, setCenter] = useState(
        {
            lat: 12.943500843027449,
            lon: 77.59497642517088,
        }
    )
    const [mapLayers, setMapLayers] = useState([]);

    let data = {}
    let res = null

    const [allHexagons, setAllHexagons] = useState([]);

    const [color, setColor] = useState([])
    //  const [objectcount, setobjectcount] = useState([])


    const ZOOM = 12
    const mapRef = useRef()



    //Multivariable heatmap var
    const [apt, setapt] = useState(0)
    const [business, setbusiness] = useState(0)
    const [conv, setconv] = useState(0)

    const [gym, setgym] = useState(0)

    const [rest, setrest] = useState(0)


    const update1 = (e, val) => {
        setapt(val);


    }
    const update2 = (e, val) => {
        setbusiness(val);


    }
    const update3 = (e, val) => {
        setconv(val);

    }

    const update5 = (e, val) => {
        setgym(val);


    }

    const update8 = (e, val) => {
        setrest(val);

    }
    
    const agent = new https.Agent({  
        rejectUnauthorized: false
       });
    

    const onSubmit = (event) => {
        event.preventDefault()
        setColor([]);
        setAllHexagons([]);
       console.log([rest/100,conv/100,gym/100,apt/100,business/100]);


        axios.post('https://spatialapi.unmazer.ai/post_json_vhmap',
        {
            weights: [rest / 100, conv / 100, gym / 100, apt / 100, business / 100],
            httpsAgent: agent
      }) .then((response) => {
			
			console.log(response.data);

                let temp = [];
                let tempColors = [];
                var mini = Math.min(...response.data.Rank);
                var maxi = Math.max(...response.data.Rank);
                var maxrank = response.data.Max_Rank;

                let colorrange = [];
                var j = 0;
                for (var i =0; i <= maxrank-1; i++) {
                    colorrange[j] = COLOR_RANGE[i];
                    j++;
                }


                const colorScale = scaleQuantile()
                    .domain([mini,maxi])
                    .range(colorrange);

                for (var j = 0; j < response.data.Hex_ids.length; j++) {
                    temp[j] = h3.h3ToGeoBoundary(response.data.Hex_ids[j]);
                    tempColors[j] = colorScale(response.data.Rank[j]);
                }
                setAllHexagons(temp);
                setColor(tempColors);




            }
                ,
                (Error) => {
                    console.log(Error)
                })

       
    }



    console.log(color);

    return (
        <div className='cityMap'>

            <Grid container >
                <Grid item xs={4}>
                    <div className='slider-columns'>
                        <div className='sliders'>
                            <div style={{ width: 300, margin: 30 }}>
                                Apartments
                                <Slider value={apt} onChange={update1} valueLabelDisplay="auto" />

                            </div>
                            <div style={{ width: 300, margin: 30 }}>
                                Office Parks
                                <Slider value={business} onChange={update2} valueLabelDisplay="auto" />

                            </div>
                            <div style={{ width: 300, margin: 30 }}>
                                Convenience And Grocery Store
                                <Slider value={conv} onChange={update3} valueLabelDisplay="auto" />

                            </div>

                            <div style={{ width: 300, margin: 30 }}>
                                Gyms
                                <Slider value={gym} onChange={update5} valueLabelDisplay="auto" />

                            </div>


                            <div style={{ width: 300, margin: 30 }}>
                                Restaurants
                                <Slider value={rest} onChange={update8} defaultValue={0} valueLabelDisplay="auto" />
                            </div>

                            <div className='submit heatmapSubmit'>
                                <button className='submit' onClick={onSubmit}>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className="city-App">
                        <header className="city-App-header">
                            <MapContainer
                                center={center}
                                zoom={ZOOM}
                                ref={mapRef}
                                type="geojson"
                                data={geojson}
                                fullscreenControl={true}
                            >
                                <FeatureGroup>

                                </FeatureGroup>

                                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />

                                {color.map((c, index) => (

                                    <Polygon positions={allHexagons[index]} fillColor={c} opacity={0.05} fillOpacity={0.5} color='#7e8580'></Polygon>
                                ))}

                            </MapContainer>
                        </header>
                    </div>
                </Grid>
            </Grid>

        </div>
    );
}

export default CityMap1;
