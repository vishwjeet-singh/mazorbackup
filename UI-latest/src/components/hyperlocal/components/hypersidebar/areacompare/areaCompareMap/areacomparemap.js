import '../../../hyperMap/leaflet.css'
import { MapContainer, TileLayer, FeatureGroup, Polygon, Marker, Popup } from 'react-leaflet'
import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet'
import osm from "../../../hyperMap/osm-provider"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js"
import "leaflet-fullscreen/dist/leaflet.fullscreen.css"
import { EditControl } from "react-leaflet-draw"
import ReCenter from '../../../hyperMap/recenter'

import axios from "axios"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as https from 'https';
import Deduct from '../../../../../useraccount/components/useraccountMain/components/Creditdeduction';
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


const Map = ({ setResponse, check, markerObject1, submit, markercenter1, markerObject2, markercenter2, markerObject3, markercenter3,setbutton}) => {
const { currentUser, logout } = useAuth();
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



  const [center1, setCenter1] = useState(
    {
      lat: 12.97,
      lon: 77.59497642517088
    }
  )
  const [center2, setCenter2] = useState(
    {
      lat: 12.97,
      lon: 77.59497642517088
    }
  )
  const [center3, setCenter3] = useState(
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



  const [mapLayers, setMapLayers] = useState([]);


  let res = null
  
  const agent = new https.Agent({  
    rejectUnauthorized: false
   });


  const ZOOM = 12
  const mapRef = useRef()

  const [data, setCoordinatesData] = useState(null)
  let v = false;
  const _onCreate = (e) => {
    console.log(`oncreate function started`);
	  

    const { layerType, layer } = e;


    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);

      setCoordinatesData({ coordinates: layer.getLatLngs()[0] })
      axios.post('https://spatialapi.unmazer.ai/post_json',
        { coordinates: layer.getLatLngs()[0],
          status: "False",
           }
        ).
        then((response) => {
          if(response.data)
          {
            Deduct (currentUser.email);
          }
          setuses(prev => prev + 1);
         console.log(response.data);
		  setarray(previousState => (
     [...previousState, response.data]
));
	   

        },
          (Error) => {
            console.log(Error)
          })


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


  const [markerPos1, setMarkerPos1] = useState([])
  const [markerPos2, setMarkerPos2] = useState([])
  const [markerPos3, setMarkerPos3] = useState([])
  useEffect(() => {
    if (markerObject1.lat || markerObject1.lng) {
      markerPos1[0] = markerObject1.lat
      markerPos1[1] = markerObject1.lng
      console.log(markerPos1);

      setCenter1({
        lat: markerObject1.lat,
        lon: markerObject1.lng
      })
    }
    else if (markerObject1.lat == 'null' && markerObject1.lng == 'null') {
      console.log('markerobject prop is null');
      setCenter1(center1)
    }

    if (markerObject2.lat || markerObject2.lng) {
      markerPos2[0] = markerObject2.lat
      markerPos2[1] = markerObject2.lng
      console.log(markerPos2);

      setCenter2({
        lat: markerObject2.lat,
        lon: markerObject2.lng
      })
    }
    else if (markerObject2.lat == 'null' && markerObject2.lng == 'null') {
      console.log('markerobject prop is null');
      setCenter2(center2)
    }
    if (markerObject3.lat || markerObject3.lng) {
      markerPos3[0] = markerObject3.lat
      markerPos3[1] = markerObject3.lng
      console.log(markerPos3);

      setCenter3({
        lat: markerObject3.lat,
        lon: markerObject3.lng
      })
    }
    else if (markerObject3.lat == 'null' && markerObject3.lng == 'null') {
      console.log('markerobject prop is null');
      setCenter3(center3)
    }


  }, [markerObject1, markerObject2, markerObject3])



	
	
  useEffect(()=>{
	  
	 if(uses===1 && submit)
		 {
	     setbutton();
			alert("Number of area should be greater than 1");
      
		
		 }
    if (uses===2 && submit) {
		  setbutton();
      setResponse(array)
    }
	 if(uses===3 && submit)
		 {
			 setbutton();
			 handleClickOpen();
			 setResponse(array);
		 }
	  if(uses>3 && submit)
		  {
			  setbutton();
			  alert("Maximum number of area allowed is 3")
		  }
	  
  },[uses,submit])
	
useEffect(()=>{
	
	console.log("Array",array);
	console.log("uses",uses);
},[array,uses])
  
  useEffect(() => {
    if (data) {

      if (submit) {
		
				  v = false;
       check(v);
      
       axios.post('https://spatialapi.unmazer.ai/post_json',
       { coordinates: data.coordinates,
         status: "False" ,
          }
        ).
          then((response) => {
		
			
					v=true;
					check(v);

            console.log(response.data);
          },
            (Error) => {
              console.log(Error)
            })

        axios.post('https://spatialapi.unmazer.ai/get_apps',{
          coordinates: data.coordinates,
         }
        ).
          then((response) => {
			
					v=true;
					check(v);
				 
            
          },
            (Error) => {
              console.log(Error);
            })
      }
    }


  }, [data, submit])






  return (
    <div className="App">
      <header className="App-header">
        <MapContainer
          center={center1}
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
          {markerPos1.length ? <Marker position={markercenter1} ></Marker> : null}
          {markerPos1.length ? <ReCenter center={markerPos1} zoom={13} /> : null}
          {markerPos2.length ? <Marker position={markercenter2} ></Marker> : null}
          {markerPos2.length ? <ReCenter center={markerPos2} zoom={13} /> : null}
          {markerPos3.length ? <Marker position={markercenter3} ></Marker> : null}
          {markerPos3.length ? <ReCenter center={markerPos3} zoom={13} /> : null}
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