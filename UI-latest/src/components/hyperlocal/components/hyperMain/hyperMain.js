import HyperSideBar from '../hypersidebar/hypersidebar'
import HyperRadioBtn from '../hyperRadioBtn/hyperRadioBtn'
import HyperCards from '../hyperCards/hyperCards'
import Map from '../hyperMap/leaflet'
import CityMap from '../cityMap/cityMap'
import CityMap1 from '../cityMap/cityMap1'
import Connectivity from '../hypersidebar/connectivity/connectivity'
import AreaCompare from '../hypersidebar/areacompare/areacompare'
import SimilarArea from '../hypersidebar/similarArea/similarArea'
import './hyperMain.css'
import gearbutton from './loadingicon.gif'
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import { TextField } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useEffect, useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'; //by default uses Google's APIs, but we have to give an access token (given in index.html)
import {db} from "../../../useraccount/components/useraccountMain/firebase";
import { useAuth } from "../../../useraccount/components/useraccountMain/contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
        
      </div>
      
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }


const HyperMain = ({ display, setDisplay }) => {
    
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()

    //keystats
    const [population, setpopulation] = useState(0)
    const [malecount, setmalecount] = useState(0)
    const [housecount, sethousecount] = useState(0)
    const [femalecount, setfemalecount] = useState(0)

    //customer segmentation
    const [diners, setDiners] = useState(0)
    const [health, setHealth] = useState(0)
    const [musicGames, setMusicGames] = useState(0)
    const [flag, setflag] = useState(true);
    const [open, setOpen] = useState(false);
    const [markercenter, setmarkercenter] = useState([0, 0])
    //for autocomplete input search
    const [address, setAddress] = useState('')
    const [coord, setCoord] = useState({
        lat: null,
        long: null
    })
     //here we use the geocoding api (getting the selected place's coordinates). We get place's suggestion using Places API.
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

    const [demoInfraResponse, setDemoInfraResponse] = useState(null)
    const setdemoInfrastructure = (response) => {
        setDemoInfraResponse(response)
    }
    const [customerSegResponse, setCustomerSegResponse] = useState(null)
    const setCustomerSegmentation = (response) => {
        setCustomerSegResponse(response)
    }
    const [polygonCoordinates, setPolygonCoordinates] = useState(null)
    const setCoordinates = (response) => {
        setPolygonCoordinates(response)
    }
    const check = (a) => {
        setflag(a);
        setOpen(!open);
    }
    const classes = useStyles();
    const [submit, setSubmit] = useState(0)
    const [page,setpage]=useState(false);

    //heatmap menu
    const [opened, setOpened] = useState(false);
    const [multiopen, setMultiOpen] = useState(false);
    const handleClickOpened = () => {
      setOpened(true);
    };
    const handleClosed = () => {
        setOpened(false);
      };
    const handleClickmultiOpened = () => {
        setMultiOpen(true);
      };
      const handlemultiClosed = () => {
          setMultiOpen(false);
        };
    const [value, setValue] = useState(0);
    const handle = (event, newValue) => {
      setValue(newValue);
    };
    const handleClose = () => {
      setOpen(false);
    }
    const [checked, setChecked] = useState(true);

    
      //multi
      const[demograph,setDemograph]=useState("");
    const[female,setFemale]=useState("");
    const[populate,setPopulate]=useState("");
    const[houses,setHouses]=useState("");
    const[restaurants,setRestaurants]=useState("");
    
    const[Store,setStore]=useState("");
    
    const[gyms,setGyms]=useState("");
    
    const[apartment,setApartment]=useState("");
    
    const[parks,setParks]=useState("");
    const[tourist,setTourist]=useState("");
    const[fitness,setFitness]=useState("");
    const[games,setGames]=useState("");
    const [openit, setOpenit] = useState(false);
    
    //multi function
    function restaurantOpenFunction(){
        var mydiv=document.getElementById("restaurantdiv");
        var close=document.getElementById("restaurantclose");
        close.style.display="inline-block";
        mydiv.style.display="inline-block"
        
      }
  
      function restaurantCloseFunction(){
        
        var mydiv=document.getElementById("restaurantdiv");
        var close=document.getElementById("restaurantclose");
        close.style.display="none";
        mydiv.style.display="none";
  
      }
      function StoreOpenFunction(){
        var mydiv=document.getElementById("storediv");
        var close=document.getElementById("storeclose");
        close.style.display="inline-block";
        mydiv.style.display="inline-block"
        
      }
  
      function StoreCloseFunction(){
        
        var mydiv=document.getElementById("storediv");
        var close=document.getElementById("storeclose");
        close.style.display="none";
        mydiv.style.display="none";
  
      }
      function GymsOpenFunction(){
        var mydiv=document.getElementById("gymsdiv");
        var close=document.getElementById("gymsclose");
        close.style.display="inline-block";
        mydiv.style.display="inline-block"
        
      }
  
      function GymsCloseFunction(){
        
        var mydiv=document.getElementById("gymsdiv");
        var close=document.getElementById("gymsclose");
        close.style.display="none";
        mydiv.style.display="none";
  
      }
  
      function ApartmentsOpenFunction(){
        var mydiv=document.getElementById("apartmentsdiv");
        var close=document.getElementById("apartmentsclose");
        close.style.display="inline-block";
        mydiv.style.display="inline-block"
        
      }
  
      function ApartmentsCloseFunction(){
        
        var mydiv=document.getElementById("apartmentsdiv");
        var close=document.getElementById("apartmentsclose");
        close.style.display="none";
        mydiv.style.display="none";
  
      }
  
      function ParksOpenFunction(){
        var mydiv=document.getElementById("parksdiv");
        var close=document.getElementById("parksclose");
        close.style.display="inline-block";
        mydiv.style.display="inline-block"
        
      }
  
      function ParksCloseFunction(){
        
        var mydiv=document.getElementById("parksdiv");
        var close=document.getElementById("parksclose");
        close.style.display="none";
        mydiv.style.display="none";
  
      }
      
      function TouristOpenFunction(){
        var mydiv=document.getElementById("touristdiv");
        var close=document.getElementById("touristclose");
        close.style.display="inline-block";
        mydiv.style.display="inline-block"
        
      }
  
      function TouristCloseFunction(){
        
        var mydiv=document.getElementById("touristdiv");
        var close=document.getElementById("touristclose");
        close.style.display="none";
        mydiv.style.display="none";
  
      }
      
      function HealthOpenFunction(){
        var mydiv=document.getElementById("healthdiv");
        var close=document.getElementById("healthclose");
        close.style.display="inline-block";
        mydiv.style.display="inline-block"
        
      }
  
      function HealthCloseFunction(){
        
        var mydiv=document.getElementById("healthdiv");
        var close=document.getElementById("healthclose");
        close.style.display="none";
        mydiv.style.display="none";
  
      }
      
      function MusicOpenFunction(){
        var mydiv=document.getElementById("musicdiv");
        var close=document.getElementById("musicclose");
        close.style.display="inline-block";
        mydiv.style.display="inline-block"
        
      }
  
      function MusicCloseFunction(){
        
        var mydiv=document.getElementById("musicdiv");
        var close=document.getElementById("musicclose");
        close.style.display="none";
        mydiv.style.display="none";
  
      }
      
      function MaleOpenFunction(){
        var mydiv=document.getElementById("malediv");
        var close=document.getElementById("maleclose");
        close.style.display="inline-block";
        mydiv.style.display="inline-block"
        
      }
  
      function MaleCloseFunction(){
        
        var mydiv=document.getElementById("malediv");
        var close=document.getElementById("maleclose");
        close.style.display="none";
        mydiv.style.display="none";
  
      }
      
      function FemaleOpenFunction(){
        var mydiv=document.getElementById("femalediv");
        var close=document.getElementById("femaleclose");
        close.style.display="inline-block";
        mydiv.style.display="inline-block"
        
      }
  
      function FemaleCloseFunction(){
        
        var mydiv=document.getElementById("femalediv");
        var close=document.getElementById("femaleclose");
        close.style.display="none";
        mydiv.style.display="none";
  
      }
      
      function PopulationOpenFunction(){
        var mydiv=document.getElementById("populationdiv");
        var close=document.getElementById("populationclose");
        close.style.display="inline-block";
        mydiv.style.display="inline-block"
        
      }
  
      function PopulationCloseFunction(){
        
        var mydiv=document.getElementById("populationdiv");
        var close=document.getElementById("populationclose");
        close.style.display="none";
        mydiv.style.display="none";
  
      }
      
      function HouseOpenFunction(){
        var mydiv=document.getElementById("housediv");
        var close=document.getElementById("houseclose");
        close.style.display="inline-block";
        mydiv.style.display="inline-block"
        
      }
  
      function HouseCloseFunction(){
        
        var mydiv=document.getElementById("housediv");
        var close=document.getElementById("houseclose");
        close.style.display="none";
        mydiv.style.display="none";
  
      }
      
      const handleClickOpen = () => {
        setOpen(true);
      };

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
            <HyperSideBar display={display} setDisplay={setDisplay} />

            {display === 'hyperMain' &&
                <div className='flex-column'>
                    <div className='center'>
                        <div className='content'>
                            <p className='paragraph'>
                                Hyperlocal Intelligence provides you information about the location where your businesses are and how they could be useful for various need basis.
                            </p>
                            <div className='form'>
                                <p className='title'>Choose your location</p>
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
                                    <button className='submit' onClick={() => { setSubmit(submit + 1) }}>SUBMIT</button>
                                </div>
                            </div>
                        </div>

                        <div className='map hypermap'>
                            <Map setdemoInfrastructure={setdemoInfrastructure} check={check} setCustomerSegmentation={setCustomerSegmentation} markerObject={coord} submit={submit} markercenter={markercenter} setCoordinates={setCoordinates} />
                        </div>
                    </div>
                    {flag ? " " : <Backdrop className={classes.backdrop} open={open} >
                        <img src={gearbutton} style={{ width: "300px", height: "200px" }} ></img>
                    </Backdrop>}
                    <div className='bottom'>
                        <HyperCards demoInfraResponse={demoInfraResponse} customerSegResponse={customerSegResponse} polygonCoordinates={polygonCoordinates} />

          {/*heatmap menu*/}

                        <div className="heatmap-checkbox">
                         
                        <div style={{color:"blue",marginLeft:"20px" ,marginBottom:"10px"}}onClick={handleClickmultiOpened}><h4>Variable Selection</h4></div>
                       
                        
                       <div>
                        <Dialog
                                  open={multiopen}
                                  onClose={handlemultiClosed}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogContent>
                                  <DialogTitle id="alert-dialog-title">{"Multi-Parameter"}</DialogTitle>
                                    <DialogContentText  style={{width:"500px",height:"400px"}}>
                                    <div className={classes.root} value="multitab">
                                         <Tabs
                                             orientation="vertical"
                                              variant="scrollable"
                                              value={value}
                                              onChange={handle}
                                              aria-label="Vertical tabs example"
                                              className={classes.tabs}
                                            >
                                              <Tab label="Demographics" {...a11yProps(0)} />
                                              <Tab label="Infrastructure Details" {...a11yProps(1)} />
                                              <Tab label="Customer Segmentation" {...a11yProps(2)} />                                                 
                                            </Tabs>
                                            <TabPanel value={value} index={0} >
                                           <input type="checkbox" id="male" onClick={MaleOpenFunction} name="male" value="Male" color="primary" onChange={(e)=>{const demo=e.target.value; setDemograph(demo);}}/>Male<br/><br/>
                                            <input type="checkbox" id="female" onClick={FemaleOpenFunction}  name="female" value="Female" color="primary" onChange={(e)=>{const dem=e.target.value; setFemale(dem);}}/>Female<br/><br/>
                                            <input type="checkbox" id="population" onClick={PopulationOpenFunction} name="population" value="Popuation" color="primary" onChange={(e)=>{const populatio=e.target.value; setPopulate(populatio);}}/>Population<br/><br/>
                                            <input type="checkbox"  id="house" onClick={HouseOpenFunction} name="houses" value="Houses" color="primary" onChange={(e)=>{const house=e.target.value; setHouses(house);}}/>Houses
                                    
                                            </TabPanel>
                                            
                                            <TabPanel value={value} index={1}>
                                              
                                            <input type="checkbox"  id="restaurant" onClick={restaurantOpenFunction} name="restaurants" value="Restaurants" color="primary" onChange={(e)=>{const restaurant=e.target.value; setRestaurants(restaurant);}}/>Restaurants<br/><br/>
                                            <input type="checkbox"  id="store" onClick={StoreOpenFunction} name="store" value="Grocery Store" color="primary" onChange={(e)=>{const stored=e.target.value; setStore(stored);}}/>Grocery Stores<br/><br/>
                                            <input type="checkbox"  id="gyms" onClick={GymsOpenFunction} name="gyms" value="Gyms" color="primary" onChange={(e)=>{const gym=e.target.value; setGyms(gym);}} />Gyms<br/><br/>
                                            <input type="checkbox"  id="apartments" onClick={ApartmentsOpenFunction} name="apartments" value="Apartments" color="primary" onChange={(e)=>{const apart=e.target.value; setApartment(apart);}} />Apartments<br/><br/>
                                        <input type="checkbox"  id="parks" onClick={ParksOpenFunction} name="parks" value="Office Parks" color="primary" onChange={(e)=>{const park=e.target.value; setParks(park);}} />Office Parks                     
                                            </TabPanel>
                                            <TabPanel value={value} index={2}>
                                            <input type="checkbox"  id="tourist" onClick={TouristOpenFunction} name="Tourist Diners" value="Tourist Diners" color="primary" onChange={(e)=>{const tour=e.target.value; setTourist(tour);}}/>Tourist Diners<br/><br/>
                                            <input type="checkbox"  id="health" onClick={HealthOpenFunction} name="Health and Fitness" value="Health and Fitness" color="primary"onChange={(e)=>{const fit=e.target.value; setFitness(fit);}} />Health and Fitness<br/><br/>
                                            <input type="checkbox"  id="music" onClick={MusicOpenFunction} name="Music Games" value="Music Games" color="primary" onChange={(e)=>{const game=e.target.value; setGames(game);}}/>Music Games
                                            </TabPanel>
                              </div>
                                            <TabPanel style={{border:"2px solid black"}}>
                                               <b>Demographics:</b>&nbsp;
                                               <div id="malediv" style={{marginLeft:"10px"}}>{demograph}<a href="#" id="maleclose" onClick={MaleCloseFunction} style={{display:"none",marginLeft:"6px"}}>x</a></div>
                                               <div id="femalediv" style={{marginLeft:"10px"}}>{female}<a href="#" id="femaleclose" onClick={FemaleCloseFunction} style={{display:"none",marginLeft:"6px"}}>x</a></div>
                                               <div id="populationdiv" style={{marginLeft:"10px"}}>{populate}<a href="#" id="populationclose" onClick={PopulationCloseFunction} style={{display:"none",marginLeft:"6px"}}>x</a></div>
                                               <div id="housediv" style={{marginLeft:"10px"}}>{houses}<a href="#" id="houseclose" onClick={HouseCloseFunction} style={{display:"none",marginLeft:"6px"}}>x</a></div>
                                               <b>Infrastructure Details:</b>&nbsp;
                                               <div id="restaurantdiv" style={{marginLeft:"10px"}}>{restaurants}<a href="#" id="restaurantclose" onClick={restaurantCloseFunction} style={{display:"none",marginLeft:"6px"}}>x</a></div>
                                               <div id="storediv" style={{marginLeft:"10px"}}>{Store}<a href="#" id="storeclose" onClick={StoreCloseFunction} style={{display:"none",marginLeft:"6px"}}>x</a></div>
                                               <div id="gymsdiv" style={{marginLeft:"10px"}}>{gyms}<a href="#" id="gymsclose" onClick={GymsCloseFunction} style={{display:"none",marginLeft:"6px"}}>x</a></div>
                                               <div id="apartmentsdiv" style={{marginLeft:"10px"}}>{apartment}<a href="#" id="apartmentsclose" onClick={ApartmentsCloseFunction} style={{display:"none",marginLeft:"6px"}}>x</a></div>
                                               <div id="parksdiv" style={{marginLeft:"10px"}}>{parks}<a href="#" id="parksclose" onClick={ParksCloseFunction} style={{display:"none",marginLeft:"6px"}}>x</a></div>
                                              <b>Customer Segmentation:</b>&nbsp;
                                              <div id="touristdiv" style={{marginLeft:"10px"}}>{tourist}<a href="#" id="touristclose" onClick={TouristCloseFunction} style={{display:"none"}}>x</a></div>
                                              <div id="healthdiv" style={{marginLeft:"10px"}}>{fitness}<a href="#" id="healthclose" onClick={HealthCloseFunction} style={{display:"none"}}>x</a></div>
                                              <div id="musicdiv" style={{marginLeft:"10px"}}>{games}<a href="#" id="musicclose" onClick={MusicCloseFunction} style={{display:"none"}}>x</a></div>
                                            </TabPanel>
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handlemultiClosed} color="primary">
                                      Disagree
                                    </Button>
                                    <Button onClick={handlemultiClosed} color="primary" autoFocus>
                                      Agree
                                    </Button>
                                  </DialogActions>
                                </Dialog>
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



                            <RadioGroup >
                                <FormControlLabel value="single" control={<Radio color="primary"  onChange={handleChange} />} label="Single-Parameter" />
                                
                                <FormControlLabel
                                    value="multi" control={<Radio color="primary" onChange={handleChange}  />} label="Multi-Parameter"
                                />
                              </RadioGroup>
                        
                        </div>
                        {(selectedValue === "single") ? <CityMap /> : ' '}
                        {(selectedValue === "multi") ? <CityMap1 /> : ' '}

                    </div>
                </div>
            }
            {display === 'similarArea' && <SimilarArea />}
            {display === 'areaCompare' && <AreaCompare />}
            {display === 'connectivity' && <Connectivity />}
        </div>
    )
}
export default HyperMain
