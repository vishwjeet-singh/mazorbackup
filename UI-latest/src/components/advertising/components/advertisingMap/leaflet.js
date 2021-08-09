import './leaflet.css';
import { MapContainer, TileLayer, FeatureGroup, Polygon, Marker, Popup } from 'react-leaflet'
import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet'
import osm from "./osm-provider"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js"
import "leaflet-fullscreen/dist/leaflet.fullscreen.css"
import { EditControl } from "react-leaflet-draw"
import ReCenter from './recenter'
import axios from "axios"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as https from 'https';
import Deduct from '../../../useraccount/components/useraccountMain/components/Creditdeduction';
import { useAuth } from "../../../useraccount/components/useraccountMain/contexts/AuthContext"



delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});


const Map = ({ setResponse, check,  markerObject, submit, markercenter, setCoordinates,gender,setnumberofIds,setDevice,iosuser,setGender,setbutton }) => {

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

  const handleClickOpen = () => {
    setOpen(true);
    setuses(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const agent = new https.Agent({  
    rejectUnauthorized: false
   });

  
  

  let res = null



  const ZOOM = 12
  const mapRef = useRef()
  let v = false;
  const [data, setCoordinatesData] = useState(null)
  const [array, setarray] = useState([]);


  const [mapLayers, setMapLayers] = useState([]);
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
    setResponse(null);
    setnumberofIds(0);
   
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
      if (submit) {
        v = false;
        check(v);

        axios.post('https://home.unmazer.ai/post_json',
        {
          coordinates: data.coordinates,
          status: "False",
         
                
          
      }
        ).
          then((response) => {
            if(response.data)
            {
              Deduct (currentUser.email);
            }
           var temparray=[];
           var temparray1=[];
           var temparray2=[];
            v = true;
            check(v);
           
            
            console.log(response.data);
           

            setuses(prev => prev + 1);
            if(gender==="Male")
            {
              
              if(iosuser==="YES")
              {
                var j=0;
                var i=0;
                while(temparray.length<10)
                {
                      if(response.data.Gender[j]==="MALE" && response.data.Device[j]==="YES")
                      {
                        temparray.push(response.data.Mobile_Ad_Id[j]);
                        temparray1.push(response.data.Device[j]);
                        temparray2.push(response.data.Gender[j]);
                        i++;
                      }
                      j++;
  
                  
                }
                setnumberofIds(response.data.Male_count);
                 
              }
              else if(iosuser==="NO")
              {
                var j=0;
                var i=0;
                while(temparray.length<10)
                {
                      if(response.data.Gender[j]==="MALE" && response.data.Device[j]==="NO")
                      {
                        temparray.push(response.data.Mobile_Ad_Id[j]);
                        temparray1.push(response.data.Device[j]);
                        temparray2.push(response.data.Gender[j]);
                        i++;
                      }
                      j++;
  
                  
                }
                setnumberofIds(response.data.Male_count);
                  
              }
              else
              {
                var j=0;
                var i=0;
                while(temparray.length<10)
                {
                      if(response.data.Gender[j]==="MALE")
                      {
                        temparray.push(response.data.Mobile_Ad_Id[j]);
                        temparray1.push(response.data.Device[j]);
                        temparray2.push(response.data.Gender[j]);
                        i++;
                      }
                      j++;
  
                  
                }
                setnumberofIds(response.data.Male_count);
              }
           
              
            }
            else if(gender==="Female")
            {
               
              if(iosuser==="YES")
              {
                var j=0;
                var i=0;
                while(temparray.length<10)
                {
                      if(response.data.Gender[j]==="FEMALE" && response.data.Device[j]==="YES")
                      {
                        temparray.push(response.data.Mobile_Ad_Id[j]);
                        temparray1.push(response.data.Device[j]);
                        temparray2.push(response.data.Gender[j]);
                        i++;
                      }
                      j++;
  
                  
                }
                setnumberofIds(response.data.Female_count);
                 
              }
              else if(iosuser==="NO")
              {
                var j=0;
                var i=0;
                while(temparray.length<10)
                {
                      if(response.data.Gender[j]==="FEMALE" && response.data.Device[j]==="NO")
                      {
                        temparray.push(response.data.Mobile_Ad_Id[j]);
                        temparray1.push(response.data.Device[j]);
                        temparray2.push(response.data.Gender[j]);
                        i++;
                      }
                      j++;
  
                  
                }
                setnumberofIds(response.data.Female_count);
                  
              }
              else
              {
                var j=0;
                var i=0;
                while(temparray.length<10)
                {
                      if(response.data.Gender[j]==="FEMALE")
                      {
                        temparray.push(response.data.Mobile_Ad_Id[j]);
                        temparray1.push(response.data.Device[j]);
                        temparray2.push(response.data.Gender[j]);
                        i++;
                      }
                      j++;
  
                  
                }
                setnumberofIds(response.data.Female_count);
              }
           
              
            }



            
            else if(gender!="Male" && gender!="Female")
            {
              if(iosuser==="YES")
              {
                var j=0;
                var i=0;
                while(temparray.length<20)
                {
                      if(  response.data.Device[j]==="YES")
                      {
                        temparray.push(response.data.Mobile_Ad_Id[j]);
                        temparray1.push(response.data.Device[j]);
                        temparray2.push(response.data.Gender[j]);
                        i++;
                      }
                      j++;
  
                  
                }
                setnumberofIds(Number(response.data.Female_count)+Number(response.data.Male_count));
                 
              }
              else if(iosuser==="NO")
              {
                var j=0;
                var i=0;
                while(temparray.length<20)
                {
                      if( response.data.Device[j]==="NO")
                      {
                        temparray.push(response.data.Mobile_Ad_Id[j]);
                        temparray1.push(response.data.Device[j]);
                        temparray2.push(response.data.Gender[j]);
                        i++;
                      }
                      j++;
  
                  
                }
                setnumberofIds(Number(response.data.Female_count)+Number(response.data.Male_count));
              }
              else
              {
                var j=0;
                var i=0;
                while(temparray.length<20)
                {
                      temparray.push(response.data.Mobile_Ad_Id[j]);
                        temparray1.push(response.data.Device[j]);
                        temparray2.push(response.data.Gender[j]);
                       
                        
                      j++;
  
                  
                }
                setnumberofIds(Number(response.data.Female_count)+Number(response.data.Male_count));
              }
           
             

             

            }

            setbutton();
            setCoordinates(data);
            setDevice(temparray1);
            setResponse(temparray);
            setGender(temparray2);
          
            
          },
            (Error) => {
              console.log(Error)
            })

        
      }
    }


  }, [data, submit])



  if (uses === 3) {
    handleClickOpen();
  }



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
            <Button color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Allow
            </Button>
          </DialogActions>
        </Dialog>
      </header>
    </div>
  );
}

export default Map;
