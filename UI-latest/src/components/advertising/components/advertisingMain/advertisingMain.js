import AdvertisingSideBar from '../advertisingsidebar/advertisingsidebar'
import RadioBtn from '../advertisingRadioBtn/advertisingRadioBtn'
import Map from '../advertisingMap/leaflet'
import AdvertisingCards from '../advertisingCard/advertisingCards'
import './advertisingMain.css'
import gearbutton from './loadingicon.gif'
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import { useEffect, useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import { useAuth } from "../../../useraccount/components/useraccountMain/contexts/AuthContext"
import { Link, useHistory } from "react-router-dom";
import {db} from "../../../useraccount/components/useraccountMain/firebase";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core'
  



  
  

const AdvertisingMain = ({ display, setDisplay }) => {
    
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()

    
    //for autocomplete input search
    const [address, setAddress] = useState('')
    const [markercenter, setmarkercenter] = useState([0, 0])
    const [flag, setflag] = useState(true);
    const [open, setOpen] = useState(false);
    
    const [coord, setCoord] = useState({
        lat: null,
        long: null
    })
    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latlng = await getLatLng(results[0])
        setAddress(value)
        setCoord(latlng)
        setmarkercenter([latlng.lat, latlng.lng])
    }

    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#FFFFFF',
        },
        tabs: {
            borderRight: `1px solid ${theme.palette.divider}`,
          },
          root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            height: 224,
          },
    }));

    
    const [polygonCoordinates, setPolygonCoordinates] = useState(null)
    const setCoordinates = (response) => {
        setPolygonCoordinates(response)
    }

    const [totalcount,settotalcount]=useState(0);
    const setnumberofIds=(response)=>{
        settotalcount(response)
    }
    const check = (a) => {
        setflag(a);
        setOpen(!open);
    }
    const classes = useStyles();
    const [submit, setSubmit] = useState(false);
    const [dropdownOptions, setDropdownOptions] = useState([])
   for(var j=0;j<=1;j++)
   {
       if(j==0)
       {
           dropdownOptions[j]="Male";
       }
       else
       {
           dropdownOptions[j]="Female";
       }
   }
   const [iosuserdropdownOptions,setiosuserdropdownOptions]=useState([])
   for(var j=0;j<=1;j++)
   {
       if(j==0)
       {
           iosuserdropdownOptions[j]="YES";
       }
       else
       {
           iosuserdropdownOptions[j]="NO";
       }
   }
   const [premiumcustomerOptions,setpremiumcustomerOptions]=useState([])
   for(var j=0;j<=1;j++)
   {
       if(j==0)
       {
           premiumcustomerOptions[j]="YES";
       }
       else
       {
           premiumcustomerOptions[j]="NO";
       }
   }
   const [gender, setgender] = useState(" ")
   const [iosuser,setiosuser]=useState(" ")
   const [premiumcustomer,setpremiumcustomer]=useState(" ")
    const [value, setValue] = useState(0);
    const handle = (event, newValue) => {
      setValue(newValue);
    };
    const handleClose = () => {
      setOpen(false);
    }
    const [checked, setChecked] = useState(true);

    //to get response of the table
    const [advertisingResponse, setadvertisingResponse] = useState(null)
	const [deviceResponse,setdeviceResponse]=useState(null);
    const [genderResponse,setgenderResponse]=useState(null);
    const setResponse=(response_data)=> {
		
		console.log(response_data);
		       
			setadvertisingResponse(response_data)
        
    }
    const setDevice=(response_data)=> {
		
		
			setdeviceResponse(response_data)
        
    }
    const setGender=(response_data)=> {
		
		console.log(response_data);
		       
        setgenderResponse(response_data)
        
    }
    const setbutton=()=>{
		setSubmit(false);
	}
    const [opencredit, setOpencredit] = useState(false);

      const handleCloseCredit = () => {
        setOpencredit(false);
      };
      const handleClickOpencredit = () => {
        setOpencredit(true);
        
      };

      async function handleLogout() {
    
        try {
          await logout()
          history.push("/login")
          handleCloseCredit();
        } catch {
          setError("Failed to log out")
        }
      }
      
     function checkbalance()
     {
      if(currentUser)
      { console.log("called");
        const docRef=db.collection('Userdata').doc(currentUser.email)
        docRef.get().then(docSnap=>{
      
          if (docSnap.exists) {
         var result=docSnap.data().credit;
            if(result==0)
            {
              handleClickOpencredit();
            }
          }
        })

      }
       

     }
     useEffect(()=>{
      checkbalance();
     },[])
      
	
	
    return (
        <div className='main'>
           
           <AdvertisingSideBar display={display} setDisplay={setDisplay} />
            {display === 'advertisingMain' &&
                <div className='flex-column'>
                    <div className='center'>
                        <div className='content'>
                            <p className='paragraph'>
                               Advertising helps to provides you information about the number of impressions and if the right customer segments exposed to the billboard.
                            </p>
                            <RadioBtn />
                            <div className='form'>
                                <p className='title'>Choose your location</p>
                                <div className='left-side'>
                                    Gender<br />
                                    <select className='dropdown' onChange={({ target: { value } }) => setgender(value)}>
                                        <option value='default' name='default'>Select a gender ...</option>
                                        {dropdownOptions.map((option) => (
                                            <option className='options' key={option} value={option} name={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='left-side'>
                                    IOS User<br />
                                    <select className='dropdown' onChange={({ target: { value } }) => setiosuser(value)}>
                                        <option value='default' name='default'>Select an option</option>
                                        {iosuserdropdownOptions.map((option) => (
                                            <option className='options' key={option} value={option} name={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='left-side'>
                                    Premium Customer<br />
                                    <select className='dropdown' onChange={({ target: { value } }) => setpremiumcustomer(value)}>
                                        <option value='default' name='default'>Select an option</option>
                                        {premiumcustomerOptions.map((option) => (
                                            <option className='options' key={option} value={option} name={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='hypercity'>
                                    Search a location<br />
                                    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div className='search-city'>
                                                <input {...getInputProps({ placeholder: "Type address" })} />
                                                <div className='places-options'>
                                                    {loading ? <div>...loading</div> : null}
                                                    {suggestions.map(suggestion => {
                                                        const style = {
                                                            backgroundColor: suggestion.active ? '#d1d1d1' : 'white'
                                                        }
                                                        return (
                                                            <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </PlacesAutocomplete>
                                </div>
                                <div className='submit'>
                                    <button className='submit' onClick={() => { setSubmit(true)  }}>SUBMIT</button>
                                </div>
                            </div>
                        </div>
                        <Dialog open={opencredit} onClose={handleCloseCredit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Your Free Access to our Product is over,to access it more, please enter your details.


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
          <Button color="primary" onClick={handleLogout} >
            Exit
          </Button>
          <Button color="primary" onClick={handleCloseCredit}>
            Allow
          </Button>
        </DialogActions>
      </Dialog>

                        <div className='map hypermap'>
                            <Map setResponse={setResponse} check={check}  markerObject={coord} submit={submit} markercenter={markercenter} setCoordinates={setCoordinates} gender={gender}setnumberofIds={setnumberofIds} setDevice={setDevice} iosuser={iosuser} setGender={setGender} setbutton={setbutton}/>
                        </div>
                    </div>
                    {flag ? " " : <Backdrop className={classes.backdrop} open={open} >
                        <img src={gearbutton} style={{ width: "300px", height: "200px" }} ></img>
                    </Backdrop>}
                    <div className='bottom'>
			 <AdvertisingCards advertisingResponse={advertisingResponse}  gender={gender} polygonCoordinates={polygonCoordinates} totalcount={totalcount} deviceResponse={deviceResponse} genderResponse={genderResponse}/>
            </div>
                                
                  
                </div>
            }
            
        </div>
    )
}
export default AdvertisingMain

