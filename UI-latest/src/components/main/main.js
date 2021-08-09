import React, { useState, useEffect } from 'react'
import SideBar from '../sidebar/sidebar'
import FootTraffic from '../foottraffic/foottraffic'
import RadioBtn from '../radiobtn/radiobtn'
import Map from '../map/map'
import LineChart from '../chart/linechart'
import TradeArea from '../tradearea/tradearea'
import MajorPathTaken from '../majorpath/majorpath'
import AreaBusyness from '../areabusyness/areabusyness'
import ProminentInterest from '../prominentinterest/prominentinterest'
import Crossshopping from '../crossshopping/crossshopping'
import './main.css'
import * as https from 'https';

import axios from 'axios'
import Backdrop from '@material-ui/core/Backdrop';
//import gearbutton from '../hyperlocal/components/hyperMain/loadingicon.gif'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { marker } from 'leaflet'

import Deduct from "../useraccount/components/useraccountMain/components/Creditdeduction"
import { useAuth } from "../useraccount/components/useraccountMain/contexts/AuthContext"
import { Link, useHistory } from "react-router-dom";
import {db} from "../useraccount/components/useraccountMain/firebase";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Main = () => {
    const { currentUser, logout } = useAuth()
    const [error, setError] = useState("")
     const history = useHistory()
    const [avgVisit, setAvgVisit] = useState(0)
    const [dwellTime, setDwellTime] = useState(0)
    const [visits, setVisits] = useState(0) //traffic


    const [coord, setCoord] = useState(null)


    const [avgLengthofStay, setAvgLengthofStay] = useState(0);
    const [loyalityCustomer, setLoyalityCustomer] = useState(0);
    const [newCustomer, setNewCustomer] = useState(0);
    const [lostCustomer, setLostCustomer] = useState(0);

//Prominent Interest
    const[male,setmale]=useState(0);
    const[female,setfemale]=useState(0);
    const[Entertainment,setEntertainment] =useState(0);
    const[visitors,setvisitors]=useState(0);
    const[shopping,setshopping]=useState(0);
    const[travel,settravel]=useState(0);
    const[Gaming,setGaming]=useState(0);
    const[Sport_Enthusiast,setSport_Enthusiast]=useState(0);
    const[Recent_International_Visit,setRecent_International_Visit]=useState(0);
    const[ShopsOnline,setShopsOnline]=useState(0);
    const[tourist,settourist]=useState(0);


//Cross-Shopping
  const [prename,setprename]=useState([]);
  const [prevalue,setprevalue]=useState([])
  const [postname,setpostname]=useState([])
  const [postvalue,setpostvalue]=useState([])


    const [citiesArr, setCitiesArr] = useState([])
    const [inputCity, setInputCity] = useState('')
    const [placesArr, setPlacessArr] = useState([])
    const [inputPlace, setInputPlace] = useState('')


    const useStyles = makeStyles((theme) => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }));



    const classes = useStyles();

    const useStyles1 = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#FFFFFF',
        },
    }));

    const [flag, setflag] = useState(true);
    const [open, setOpen] = useState(false);


    const check = (a) => {
        setflag(a);
        setOpen(!open);
    }
    const handleToggle = () => {
        setOpen(!open);
    };


    const classes1 = useStyles1();

    
    
    //TradeArea
    const [markerArr, setMarkerArr] = useState(null)
    const [distanceArr,setdistanceArr] = useState(null);
    const [cllgArr,setcllgArr] = useState(null);
    const [shopperType,setshopperType] = useState(null);


    //MajorPathsTaken
    const [pathGeoJson, setPathGeoJson] = useState(null)


    //LineChart
    const [options, setOptions] = useState({
        'chart': {
            'id': "basic-line"
        },
        'xaxis': {
            'categories': []//array
        }
    })
    const [series, setSeries] = useState([
        {
            name: "Visits",
            data: []//array
        }
    ])

    let xaxis = []
    let yaxis = []

    const agent = new https.Agent({  
        rejectUnauthorized: false
       });

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
       

    const onSubmit = (event) => {
        event.preventDefault()
        var v = false;
        setPathGeoJson(null);

        check(v);
        handleToggle();
        axios({
            url: 'https://food.unmazer.ai/loyality',
            method: 'GET',
            
        })
            .then((response) => {
                v = true;
                check(v);
                setOpen(false);
                if(response.data)
                {
                    //Function to deduct credits
                    Deduct (currentUser.email);
                }
                for (let j = 0; j <= 11; j++) {
                    placesArr[j] = (response.data)[0].features[j].properties.Place;

                }

                //find index of input city in arr
                let i = 0
                for (i; i < placesArr.length; i++) {
                    if (inputPlace === placesArr[i]) {
                        break
                    }
                }

                setAvgVisit(((response.data)[0].features[i].properties.Avg_Visits_per_Customer))
                setDwellTime(((response.data)[0].features[i].properties.Avg_daily_Visits))
                setVisits(((response.data)[0].features[i].properties.TotalVisits))
                setAvgLengthofStay(((response.data)[0].features[i].properties.Avg_Length_of_Stay))
                setLoyalityCustomer(((response.data)[0].features[i].properties.Loyal_customer_per))
                setNewCustomer(((response.data)[0].features[i].properties.New_customer_per))
                setLostCustomer(((response.data)[0].features[i].properties.Customer_lost_per))


                
                const data = (response.data)[0].features;
                data.map(object => {
                    if (object.properties.Place === inputPlace) {
                        setCoord((object.geometry.coordinates)[0])
                    }
                })
            })
            .catch((Error) => {
                console.log(Error);
            })

        axios({
            url: 'https://food.unmazer.ai/totalvisitbyday',
            method: 'GET',
           
        })
            .then((response) => {
                 
                if(response.data)
                {
                    Deduct (currentUser.email);
                }
                for (const object of response.data) {
                    if (object.name === inputPlace) {
                        xaxis = []
                        for (let i = 0; i < object.visit.length; i++) {
                            xaxis.push(`Day ${i + 1}`)
                        }
                        setOptions({
                            'chart': {
                                'id': "basic-line"
                            },
                            'xaxis': {
                                'categories': xaxis //array
                            }
                        })
                        setSeries([
                            {
                                name: "Visits",
                                data: object.visit //array
                            }
                        ])
                        break
                    }
                }
            })
            .catch((Error) => {
                console.log(Error);
            })
            axios({
                url: 'https://food.unmazer.ai/interest',
                method: 'GET',
               
            })
                .then((response) => {
                    
                    if(response.data)
                    {
                        Deduct (currentUser.email);
                    }
                    for (const object of response.data) {
                        if (object.name === inputPlace) {
                           setmale(object.male);
                           setfemale(object.female);
                           setEntertainment(object.Entertainment);
                           setvisitors(object.Mall_Visitors);
                           setshopping(object.Shopping);
                           settravel(object.Travel);
                           setGaming(object.Gaming);
                           setSport_Enthusiast(object.Sport_Enthusiast);
                           setRecent_International_Visit(object.Recent_International_Travel);
                           setShopsOnline(object.Shops_Online);
                           settourist(object.Tourist);
                            break;
                        }
                        
                    }

                   

                })
                .catch((Error) => {
                    console.log(Error);
                })
    
        axios({
            url: 'https://food.unmazer.ai/tradearea',
            method: 'GET',
           
        })
            .then((response) => {
                if(response.data)
                {
                    Deduct (currentUser.email);
                }
                for (const object of response.data) {
                    if (object.name === inputPlace) {
                        setMarkerArr(object.homecoordinates)
                        setcllgArr(object.collegestudent)
                        setdistanceArr(object.Bin)
                        setshopperType(object.shoppertype)
                        break;
                    }
                }
            })
            .catch((Error) => {
                console.log(Error);
            })

        axios({
            url: 'https://food.unmazer.ai/majorpaths',
            method: 'GET',
           
        })
            .then((response) => {
                if(response.data)
                {
                    Deduct (currentUser.email);
                }
                for (const object of response.data) {
                    if (object.name === inputPlace) {
                        console.log(object);
                        setPathGeoJson(object.features)
                    }
                }
            })
            .catch((Error) => {
                console.log(Error);
            })

            axios({
                url: 'https://arcane-beach-68306.herokuapp.com/shopping',
                method: 'GET',
               
            })
                .then((response) => {
                  
                    
                  setprename((response.data)[0].prename);
                  setprevalue((response.data)[0].prevalue);
                  setpostname((response.data)[0].postname);
                  setpostvalue((response.data)[0].postvalue);
                   
                    
                })
                .catch((Error) => {
                    console.log(Error);
                })


    }
    

    const [dropdownOptions, setDropdownOptions] = useState([])
    const [loadingOptions, setLoadingOptions] = useState(true)
    useEffect(() => {
        async function getOptions() {
            axios({
                url: 'https://food.unmazer.ai/loyality',
                method: 'GET',
               
            })
                .then((response) => {
                    let j = 0
                    for (j; j < (response.data)[0].features.length; j++) {
                        dropdownOptions[j] = (response.data)[0].features[j].properties.Place;
                    }
                    setLoadingOptions(false);
                })
                .catch((Error) => {
                    console.log(Error);
                })
        }
        getOptions()
    }, [])

    //coord and tradearrpolygon will have its [lat,lng] switched, due to in-built differences of leaflet and mapbox
    let tradeAreaPolygon = []
    useEffect(() => {
        if (coord) {
            tradeAreaPolygon = []
            for (const coordinate of coord) {
                tradeAreaPolygon.push([[coordinate[1], coordinate[0]]])
            }
            // console.log(tradeAreaPolygon);
        }
    }, [coord])


    return (
        
        <div className='main'>
            <SideBar />

            <div className='flex-column'>
                <div className='center'>
                    <div className='content'>
                        <p className='paragraph'>
                            Foot-insights provide you information about footfall numbers of all your stores, competitors , shopping patterns, demongraphics, etc. You could easily share these with your colleagues or partners.
                        </p>

                        <RadioBtn />

                        <div className='form'>
                            <p className='title'>Choose your store</p>

                            <div className='city'>
                                <div className='left-side'>
                                    City<br />
                                    <input className='city-input' type='text' placeholder='Bangalore' onChange={({ target: { value } }) => setInputCity(value)} />
                                </div>

                                <div className='calendar'>
                                    <form className={classes.container} noValidate class="start">
                                        <TextField
                                            id="date1"
                                            label="Start Date"
                                            type="date"
                                            defaultValue=" "
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>
                                </div>

                            </div>


                            <div className='store'>
                                <div className='left-side'>
                                    Store Name<br />
                                    <select className='dropdown' disabled={loadingOptions} onChange={({ target: { value } }) => setInputPlace(value)}  >
                                        <option value='default' name='default'>Select a store...</option>
                                        {dropdownOptions.map((option) => (
                                            <option className='options' key={option} value={option} name={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='calendar'>
                                    <form className={classes.container} noValidate class="end">
                                        <TextField
                                            id="date2"
                                            label="End Date"
                                            type="date"
                                            defaultValue=" "
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form></div>

                            </div>

                            <div className='checkbox'>
                                <label class="checkbox">
                                    <span class="checkbox__input">
                                        <input type="checkbox" name="checkbox" />
                                        <span class="checkbox__control">

                                        </span>
                                    </span>
                                    <span class="radio__label competitors">Show me the competitors</span>
                                </label>
                            </div>


                            <div className='submit'>
                                <button className='submit' onClick={onSubmit}>SUBMIT</button>
                            </div>
                        </div>
                    </div>

                    <div className='map'>
                        <Map coordinates={coord} city={inputCity} />
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


                {!open ? " " :
                    <Backdrop className={classes1.backdrop} open={open} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }


                <div className='bottom'>
                    <FootTraffic visits={visits} dwellTime={dwellTime} avgVisit={avgVisit} avgLengthofStay={avgLengthofStay} loyalityCustomer={loyalityCustomer} newCustomer={newCustomer} lostCustomer={lostCustomer} />


                    <LineChart options={options} series={series} />

                    <ProminentInterest male={male} female={female} Entertainment={Entertainment} visitors={visitors} shopping={shopping} travel={travel} inputPlace={inputPlace}
                      Gaming={Gaming} Sport_Enthusiast={Sport_Enthusiast}  Recent_International_Visit={Recent_International_Visit} ShopsOnline={ShopsOnline} tourist={tourist}/>

                    <TradeArea coord={coord} markerArr={markerArr} shopperType = {shopperType}cllgArr= {cllgArr} distanceArr={distanceArr} />

                    <MajorPathTaken markercoord={coord} pathGeoJson={pathGeoJson} />
                    <Crossshopping prename={prename} prevalue={prevalue} postname={postname} postvalue={postvalue}/>

                    <AreaBusyness />
                </div>

            </div>
        </div>
    )
}
export default Main
