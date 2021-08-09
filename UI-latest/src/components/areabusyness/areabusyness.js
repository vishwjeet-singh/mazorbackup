import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet'
import { MapContainer, TileLayer, FeatureGroup, Polygon, Marker, Popup, Circle, LayerGroup } from 'react-leaflet'
import osm from "../hyperlocal/components/hyperMap/osm-provider"
import ReCenter from '../hyperlocal/components/hyperMap/recenter';
import { scaleQuantile} from 'd3-scale';
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js"
import "leaflet-fullscreen/dist/leaflet.fullscreen.css"
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import axios from 'axios';
import './areabusyness.css'
import Deduct from "../useraccount/components/useraccountMain/components/Creditdeduction"
import { useAuth } from "../useraccount/components/useraccountMain/contexts/AuthContext"

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const AreaBusyness = () => {
    const { currentUser, logout } = useAuth()
    const Tooltipinfo = withStyles((theme) => ({
        tooltip: {
            backgroundColor: 'white',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',

        },
    }))(Tooltip);

    const [center, setCenter] = useState(
        {
            lat: 12.97,
            lon: 77.59497642517088
        }
    )
    const [color, setColor] = useState([])

    // Red Variants
const COLOR_RANGE = [
  '#ffedea',
  '#ffe6e6',
  '#ffcccc',
  '#ffb3b3',
  '#ff9999',
  '#ff8080',
  '#ff6666',
  '#ff4d4d',
  '#ff3333',
  '#ff1a1a',
  '#ff0000',
  '#e60000',
  '#cc0000',
  '#b30000',
  '#990000',
  '#800000',
  '#660000',
  '#4d0000',
 '#330000',
  '#1a0000'];


  
	

	
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


    const ZOOM = 12
    const mapRef = useRef()

    const [hour, setHour] = useState(0)

    const useStylesforslider = makeStyles({
        root: {
            width: 1000,
        },
    });
    const classesforslider = useStylesforslider();

    let marks = []
    for (let i = 0; i <= 23; i++) {
        if(i==0)
           {
            marks.push({ value: i, label: `${i+12}AM` })
           }
           else if(i>0 && i<12)
           {
            marks.push({ value: i, label: `${i}AM` })
           }
           
           else if(i>12)
           {
            marks.push({ value: i, label: `${i-12}PM` })
           }
    }
    marks.push({value:12 , label: 'Noon'})

    const [longitude, setlongitude] = useState([])
    const [latitude, setlatitude] = useState([]);
	
	var result=[];
	const percentile=(array,len)=>{
	 var i,j,count,percent;
		for(var i=0;i<len;i++)
			{
				 count=0;
				for(var j=0;j<len;j++)
					{
						if(array[i]>array[j])
							{
								count++;
							}
					}
				 percent=(count*100)/(len-1);
				result[i]=percent;
			}
		
		return result;
		
	}

/*	const colorScale=(val)=>{
        if(val==100)
        {
            return COLOR_RANGE[19];
        }

        val/=5;

       return COLOR_RANGE[Math.trunc(val)];
	}
*/
    const onSubmit = (event) => {
        event.preventDefault()
        setColor([]);
        setlatitude([]);
        setlongitude([]);


        axios({
            url: 'https://food.unmazer.ai/areabusyness/' + hour,
            method: 'GET'
        })
            .then((response) => {
                
                let templongitude = [];
                let templatitude = [];
                let tempcolor = [];
               
		   //Finding the percentile of each location for  areabusyness
          
		  percentile(response.data[0].relative_count_monthly,response.data[0].relative_count_monthly.length)
			  console.log(result);
              if(response.data)
              {
                Deduct (currentUser.email);
              }
              const colorScale = scaleQuantile()
              .domain(result)
              .range(COLOR_RANGE);
    
                for (let i = 0; i < response.data[0].latitude.length; i++) {
                    templatitude[i] = response.data[0].latitude[i];
                    templongitude[i] = response.data[0].longitude[i];
                    tempcolor[i] = colorScale(result[i]);

                }

                setlongitude(templongitude);
                setlatitude(templatitude);
                setColor(tempcolor);


            })
            .catch((Error) => {
                console.log(Error);
            })
    }
    return (
        <div id='section4' className='area-busyness'>
            <div className='area-busyness-heading'>
                <div className='first-line'>
                    <div className='left'>
                        <Tooltipinfo placement="right"
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">Area Busyness</Typography>
                                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                    {"It's very engaging. Right?"}
                                </React.Fragment>
                            }
                        >
                            <p className='heading'>
                                <div className='heading-text'>Area Busyness</div> <InfoIcon />
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

            <div className='select-hour'>
                <p className='hour'>Hour :</p>
                <div className={classesforslider.root}>
                    <Slider value={hour} onChange={(e, val) => { setHour(val) }} defaultValue={0} marks={marks} min={0}
                        max={23} valueLabelDisplay="auto" required />
                </div>
                <div className='submit areaBusynessSubmit'>
                    <button style={{marginRight:'16px'}}  className='submit' onClick={onSubmit}>SUBMIT</button>
                </div>
            </div>

            <div className="city-App">
                <header className="tradeArea-App-header">
                    <MapContainer
                        center={center}
                        zoom={ZOOM}
                        type='geojson'
                        ref={mapRef}
                        fullscreenControl={true}
                        style={{ height: "500px" }}
                        preferCanvas={true}
                        className="areabusynessborder"


                    >
                        <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                        {color.map((c, index) => (
                            <Circle center={[latitude[index], longitude[index]]} fillColor={c} fillOpacity={0.5} color='#7e8580' opacity={0} radius={180} />
                        ))}
                    </MapContainer>
                </header>
            </div>
        </div>
    )
}

export default AreaBusyness