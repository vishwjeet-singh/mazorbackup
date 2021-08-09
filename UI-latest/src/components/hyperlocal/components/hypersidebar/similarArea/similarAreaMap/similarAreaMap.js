import { MapContainer, TileLayer, FeatureGroup, Polygon, Marker, Popup } from 'react-leaflet'
import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js"
import "leaflet-fullscreen/dist/leaflet.fullscreen.css"
import { EditControl } from "react-leaflet-draw"
import axios from 'axios';
import osm from '../../../hyperMap/osm-provider';
import ReCenter from '../../../hyperMap/recenter';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as https from 'https';
import Deduct from "../../../../../useraccount/components/useraccountMain/components/Creditdeduction";
import { useAuth } from "../../../../../useraccount/components/useraccountMain/contexts/AuthContext"

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const SimilarAreaMap = ({ setResponse,check, markerObject, submit, markercenter, getSimilarPolygonCenter, getSimilarPolygons }) => {

    const { currentUser, logout } = useAuth()
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


    const [center, setCenter] = useState(
        {
            lat: 12.97,
            lon: 77.59497642517088
        }
    )
    const [uses, setuses] = useState(0);
    const [open, setOpen] = useState(false);
	const [array, setarray] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
        setuses(0);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    let res = null


    const ZOOM = 12
    const mapRef = useRef()

    const [data, setCoordinatesData] = useState(null)
    const [carddata,setdata]=useState(null);
    let v = false;


    const [mapLayers, setMapLayers] = useState([]);
    const agent = new https.Agent({  
        rejectUnauthorized: false
       });
    const _onCreate = (e) => {
        const { layerType, layer } = e;

        if (layerType === "polygon") {
            const { _leaflet_id } = layer;

            setMapLayers((layers) => [
                ...layers,
                { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
            ]);

            setCoordinatesData({ coordinates: layer.getLatLngs()[0] })
        }
    };

    const _onEdited = (e) => {
        console.log(e);
        const {
            layers: { _layers },
        } = e;

        Object.values(_layers).map(({ _leaflet_id, editing }) => {
            data = { latlngs: { ...editing.latlngs[0] } }
            setMapLayers((layers) =>
                layers.map((l) =>
                    l.id === _leaflet_id
                        ? { ...l, latlngs: { ...editing.latlngs[0] } }
                        : l
                )
            );
        });

        console.log(e);
    };

    const _onDeleted = (e) => {
        console.log(e);
        setuses(0);
        setarray([]);
        setResponse(null);
        const {
            layers: { _layers },
        } = e;

        Object.values(_layers).map(({ _leaflet_id }) => {
            setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
        });
    };


    const [markerPos, setMarkerPos] = useState([])
    useEffect(() => {
        if (markerObject.lat || markerObject.lng) {
            markerPos[0] = markerObject.lat
            markerPos[1] = markerObject.lng
            console.log(markerPos);

            setCenter({
                lat: markerObject.lat,
                lon: markerObject.lng
            })
        }
        else {
            console.log('markerobject prop is null');
            setCenter(center)
        }
    }, [markerObject])

    useEffect(() => {
        if (data) {
            getSimilarPolygonCenter(data.coordinates[0])
            if (submit) {
				console.log(data);
                v = false;
                check(v);
                
                
                axios.post('https://spatialapi.unmazer.ai/similar_n',
                {coordinates:data.coordinates,
                  
                 }
                    
                ).
                    then((response) => {
					
                        v = true;
                        check(v);
                        if(response.data)
                        {
                            Deduct (currentUser.email);
                        }
                        
                        setdata(response.data.master_append);
                        let geojsons = []
                        response.data.master_append.map(coordinates => {
                            geojsons.push({
                                "type": "Feature",
                                "properties": {
                                    "fill": "#08519c",
                                    "fillOpacity": 0.33,
                                    "fill-opacity": 0.33,
                                    "fillColor": "#08519c",
                                    "color": "#08519c",
                                    "opacity": 1,
                                    "metric": "time"
                                },"geometry": {
                                    "type": "Polygon",
                                    "coordinates": [coordinates]
                                },
                            })
                        })
                        console.log(geojsons);
                        getSimilarPolygons(geojsons);

                       
                    },
                        (Error) => {
                            console.log(Error)
                        })
            }
        }


    }, [data, submit])

//Temporary logic for using json to render data on cards
	
  
	useEffect(() => {
		
        if(carddata)
        {
            console.log("set");
            for(var i=0;i<6;i++)
            {
                var temp=[];
               var valtemp=[];
               for(var k=0;k<carddata[i].length;k++)
               {
                   valtemp[k]=carddata[i][k];
               }
              for(var j=0;j<valtemp.length-1;j++)
                 {
                     temp[j]=({"lng":valtemp[j][0],"lat":valtemp[j][1]})
                 }
              
               
                 axios.post('https://spatialapi.unmazer.ai/post_json',
                 {
                   coordinates: temp,
                   status: "False",
                    
               }
          ).
          then((response) => {
          
          
         
            setarray(previousState => (
                [...previousState, response.data]));
             setuses(prev => prev + 1);
        
            
           
          },
            (Error) => {
              console.log(Error)
            })
  
             
      }
      Deduct (currentUser.email);
           
        }
		 
      
	   
       
  },[carddata])
	
	useEffect(()=>{
	  
   
	if(carddata && uses==6)
		{
            console.log("card show");
			setResponse(array);
		}
	  
  },[uses])

	
////////////////////////////////////////////////////////////
    



    return (
        <div className="App">
            <header className="App-header">
                <MapContainer
                    center={center}
                    zoom={ZOOM}
                    ref={mapRef}
                    type="geojson"
                    data={geojson}
                    fullscreenControl={true}
                >
                    <FeatureGroup>

                        <EditControl
                            position="topright"
                            onCreated={_onCreate}
                            onEdited={_onEdited}

                            onDeleted={_onDeleted}
                            draw={{
                                rectangle: false,
                                circle: false,
                                circlemarker: false,
                                marker: false,
                                polyline: false
                            }}
                        />
                    </FeatureGroup>

                    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                    {markerPos.length ? <Marker position={markercenter} ></Marker> : null}
                    {markerPos.length ? <ReCenter center={markerPos} zoom={13} /> : null}
              ))}




                </MapContainer>


                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To Access it more, please enter your details
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Phone Number"
                            type="number"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary">Cancel</Button>
                        <Button onClick={handleClose} color="primary">Allow</Button>
                    </DialogActions>
                </Dialog>
            </header>
        </div>
    );
}

export default SimilarAreaMap
