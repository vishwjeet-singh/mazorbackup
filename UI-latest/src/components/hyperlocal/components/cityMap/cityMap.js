import './cityMap.css'
import { MapContainer, TileLayer, FeatureGroup, Polygon, Tooltip, } from 'react-leaflet'
import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet'
import { scaleQuantile } from 'd3-scale';
import osm from "../hyperMap/osm-provider"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js"
import "leaflet-fullscreen/dist/leaflet.fullscreen.css"
import { EditControl } from "react-leaflet-draw"
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import gearbutton from '../hyperMain/loadingicon.gif'
import LinearGradient from './LinearGradient.js';
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


const CityMap = () => {

  const geojson = {
    "type": "Feature",
    "properties": {
      "stroke": "#555555",
      "stroke-width": 2,
      "stroke-opacity": 1,
      "fill": "white",
      "fill-opacity": 1,
      "Name ": "Jayanagar"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [

      ]
    }
  }


  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#FFFFFF',
    },
  }));

const [dropdownOptions, setDropdownOptions] = useState([])
const options=["Restaurants","Apartments","Gyms","Grocery Stores","Office Parks"]
for(var j=0;j<=options.length;j++)
{
   dropdownOptions[j]=options[j];
}


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
  const [flag, setflag] = useState(true);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState([])

  const check = (a) => {
    setflag(a);
    setOpen(!open);
  }

  const ZOOM = 12
  const mapRef = useRef()

  const [selectedParameter, setSelectedParameter] = useState(null)
 
  
  const classes = useStyles();

  /* Green Variants
  const COLOR_RANGE = [
    "#FFFFE5",
    "#F7FCB9",
    "#D9F0A3",
    "#ADDD8E",
    "#78C679",
    "#41AB5D",
    "#238443",
    "#006837",
    "#004529"
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


  //For gradient data display
  /*const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: twod[selectedParameter].reduce((max, item) => (item.value > max ? item.value : max), 0)
  };
  */

  const agent = new https.Agent({  
    rejectUnauthorized: false
   });



  const onSubmit = (event) => {
    event.preventDefault()
    setColor([]);
    setAllHexagons([]);
    
    var char;
    if (selectedParameter === "Restaurants") {
      char = "rest_count";
    }
    else if (selectedParameter === "Apartments") {
      char = "apt_count";
    }
    else if (selectedParameter === "Gyms") {

      char = "gym_count";
    }
    else if (selectedParameter === "Grocery Stores") {
      char = "conv_count";

    }
    else if (selectedParameter === "Office Parks") {

      char = "buisness_count";
    }
    axios({

      url: 'https://spatialapi.unmazer.ai/sheatmap?var=' + char,
      method: 'GET',
    
    })
      .then((response) => {
		
		console.log(response.data);
        let temp = [];
        let tempColors = [];
        let res = []
         let colorrange = [];
		 var mini = Math.min(...response.data.Rank);
        var maxi = Math.max(...response.data.Rank);
		var maxrank = response.data.Max_Rank;
                var j = 0;
                for (var i =0; i <=maxrank-1; i++) {
                    colorrange[j] = COLOR_RANGE[i];
                    j++;
                }


        const colorScale = scaleQuantile()
          .domain([mini,maxi])
          .range(colorrange);


        for (var j = 0; j < response.data.A_hex_ids.length; j++) {

          temp[j] = h3.h3ToGeoBoundary(response.data.A_hex_ids[j]);
          tempColors[j] = colorScale(response.data.Rank[j]);
         

        }

        setAllHexagons(temp);
        setColor(tempColors)
        
      }
        ,
        (Error) => {
          console.log(Error)
        })

  }

  
  return (
    <div className='cityMap'>
      {flag ? " " : <Backdrop className={classes.backdrop} open={open} >
        <img src={gearbutton} style={{ width: "300px", height: "200px" }} ></img>
      </Backdrop>}


      <div className='flex-row'>
        <div className='single-var-dropdown'>
          <select className='normalized dropdown'  onChange={({ target: { value } }) => {
            setSelectedParameter(value)

          }}  >
            <option name="desc">Select a parameter to render heatmap</option>
            {dropdownOptions.map((option) => (
              <option key={option} value={option} name={option}>{option}</option>
            ))}
          </select>
        </div>


        <div className='submit heatmapSubmit'>
          <button className='submit' onClick={onSubmit}>SUBMIT</button>
        </div>
      </div>

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
            <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />

            {color.map((c, index) => (
				  <Polygon positions={allHexagons[index]} fillColor={c} opacity={0.05} fillOpacity={0.5}  color='#7e8580' />

            ))}
          </MapContainer>
        </header>
      </div>
    </div>
  );
}

export default CityMap;
