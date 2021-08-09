import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet'
import { MapContainer, TileLayer, FeatureGroup, Polygon, Marker, Popup, Circle, LayerGroup } from 'react-leaflet'
import osm from "../hyperlocal/components/hyperMap/osm-provider"
import ReCenter from '../hyperlocal/components/hyperMap/recenter';
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js"
import "leaflet-fullscreen/dist/leaflet.fullscreen.css"
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { RadioGroup } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './tradearea.css';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});


const TradeArea = ({ coord, markerArr ,shopperType,cllgArr,distanceArr }) => {

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

    const [Dist, setDist] = useState(0);
    const useStylesforslider = makeStyles({
        root: {
            height: 400
        },
    });
    const classesforslider = useStylesforslider();

    let marks = [];
    marks.push({value:0 ,label: '0Km'});
    marks.push({value:2 ,label : '2Km'});
    marks.push({value:5, label: '5Km'});
    marks.push({value:10, label: '10Km'});
    marks.push({value:15, label: '10+ Km'});

    const [value, setValue] = useState('College');
    
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const ZOOM = 12
    const mapRef = useRef()

    const fillOptions = { fillColor: 'blue', fillOpacity: 0.7, color: 'blue' };
    const fillOptions1 = { fillColor: 'red', fillOpacity: 0.7, color: 'red' };
    const [Arraytobemarkedblue , setArraytobemarkedblue] = useState([]);
    const [Arraytobemarkedred , setArraytobemarkedred] = useState([]);
    

    const onSubmit = (event) => {
        
        event.preventDefault();
        if(markerArr  === null)
        return;
        setArraytobemarkedblue([]);
        setArraytobemarkedred([]);
        if(Dist > 10){
            let temp = [];
            let temp2 = [];
            if(value === 'College'){
                for(var i = 0;i<cllgArr.length;i++){
                    if(cllgArr[i] === "YES"){
                        temp.push(markerArr[i]);
                    }
                    else
                    temp2.push(markerArr[i]);
                }
                setArraytobemarkedblue(temp);
                setArraytobemarkedred(temp2);
            }
            else{
                for(var i = 0;i<shopperType.length;i++){
                    if(shopperType[i] === "Premium"){
                        temp.push(markerArr[i]);
                    }
                    else
                    temp2.push(markerArr[i]);
                }
                setArraytobemarkedblue(temp);
                setArraytobemarkedred(temp2);
            }
            return;
        }
        let temp = [];
        let temp2 =[];
        if(value === 'College'){
            for(var i = 0;i<cllgArr.length;i++){
                if(Dist === distanceArr[i]){
                    if(cllgArr[i] === "YES"){
                        temp.push(markerArr[i]);
                    }
                    else
                    temp2.push(markerArr[i]);
                } 
            }

            setArraytobemarkedblue(temp);
            setArraytobemarkedred(temp2);
        }
        else{
            for(var i = 0;i<shopperType.length;i++){
                if(Dist === distanceArr[i]){
                    if(shopperType[i] === "Premium"){
                        temp.push(markerArr[i]);
                    }
                    else
                    temp2.push(markerArr[i]);
                }
                
            }
            setArraytobemarkedblue(temp);
            setArraytobemarkedred(temp2);
        }
    }
    
    //Radio button logic starts here

    
    return (
        <div id='section2' className='trade-area'>
            
            <div className='trade-area-heading'>
                <div className='first-line'>
                    <div className='left'>
                        <Tooltipinfo placement="right"
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">Trade Area</Typography>
                                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                    {"It's very engaging. Right?"}
                                </React.Fragment>
                            }
                        >
                            <p className='heading'>
                                <div className='heading-text'>Trade Area</div> <InfoIcon />
                            </p>
                        </Tooltipinfo>
                    </div>
                    
                    <div className='right'>
                        <p className='date'></p><img className='icon' src="https://img.icons8.com/material/32/000000/sort-down--v1.png" />
                        <img src="https://img.icons8.com/windows/32/000000/share-2.png" className='icon' />
                        <img className='icon' src="https://img.icons8.com/windows/32/000000/download.png" />
                    </div>
                    
                </div>
                <FormControl component="fieldset">
                <FormLabel component="legend">Select</FormLabel>
                <RadioGroup row aria-label="Type" name="shopper" value={value} onChange={handleChange}>
                    <FormControlLabel value="College" control={<Radio />} label="College" />
                    <FormControlLabel value="Premium" control={<Radio />} label="Premium Shopper" />
                </RadioGroup>
                </FormControl>
                <div>
                <span style={{color:'blue', marginRight: '5px'}}>Yes</span>
                <span style={{color:'red'}}>No</span>
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
                        className="tradeAreaborder"

                    >
                        <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                        {coord ? <ReCenter center={[coord[0][1], coord[0][0]]} zoom={13} /> : null}
                        {coord ? <Marker position={[coord[0][1], coord[0][0]]}></Marker> : null}
                        {Arraytobemarkedblue ?
                            Arraytobemarkedblue.map(markercoord => (
                                <Circle 
                                center={markercoord} 
                                radius={20} 
                                pathOptions={fillOptions} 
                                />
                            ))

                            : null}
                        {Arraytobemarkedred ?
                            Arraytobemarkedred.map(markercoord => (
                                <Circle 
                                center={markercoord} 
                                radius={20} 
                                pathOptions={fillOptions1} 
                                />
                            ))

                            : null}
                    </MapContainer>
                    <div className="sidedistancebox">
                    <p className='distance'>Distance</p>
                    <div className={classesforslider.root}>
                        <Slider onChange={(e,val)=> { setDist(val) } }  marks ={marks} min={0} max={15} defaultValue={0}
                        valueLabelDisplay="auto" required
                        orientation="vertical"
                        />
                    </div>
                    <div className='submit tradeareaSubmit'>
                        <button className='submit' onClick={onSubmit}>SUBMIT</button>
                    </div>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default TradeArea