import { useEffect, useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';//by default uses Google's APIs, but we have to give an access token (given in index.html)
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import gearbutton from '../loadingicon.gif'
import ConnectivityCards from './connectivityCards/connectivityCards';
import ConnectivityMap from './connectivityMap/connectivityMap';
import './connectivity.css';
import Slider from '@material-ui/core/Slider';
import * as https from 'https';
import Deduct from "../../../../useraccount/components/useraccountMain/components/Creditdeduction";
import { useAuth } from "../../../../useraccount/components/useraccountMain/contexts/AuthContext"


const Connectivity = () => {
    const { currentUser, logout } = useAuth()
    const [contourMinutes, setContourMinutes] = useState(null)
    const [routingProfile, setRoutingProfile] = useState(null)

    //for autocomplete input search
    const [address, setAddress] = useState('')
    const [coord, setCoord] = useState(null)
    //here we use the geocoding api (getting the selected place's coordinates). We get place's suggestion using Places API.
    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latlng = await getLatLng(results[0])
        setAddress(value)
        setCoord(latlng)
    }
    const [flag, setflag] = useState(true);
    const [open, setOpen] = useState(false);
    const check = (a) => {
        setflag(a);

    }
    const handleToggle = () => {
        setOpen(!open);
    };

    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#FFFFFF',
        },
    }));

    const useStylesforslider = makeStyles({
        root: {
            width: 360,
        },
    });

    //slider to select contour minutes
    const marks = [
        {
            value: 0,
            label: '0 min',
        },
        {
            value: 15,
            label: '15 min',
        },
        {
            value: 30,
            label: '30 min',
        },
        {
            value: 45,
            label: '45 min',
        },
        {
            value: 60,
            label: '60 min',
        },



    ];
    const update = (e, val) => {
        setContourMinutes(val);
    }
    const classes = useStyles();
    const classesforslider = useStylesforslider();
    //connectivityCards data
    const [population, setPopulation] = useState(0)
    const [males, setMales] = useState(0)
    const [houses, setHouses] = useState(0)
    const [bus, setBus] = useState(0)
    const [rest, setRest] = useState(0)
    const [conv, setConv] = useState(0)




    const [coordinates, setCoordinates] = useState(null)
    const onSubmit = () => {
        var v = false;
        check(v);
        handleToggle();
        const agent = new https.Agent({  
            rejectUnauthorized: false
           });
        //calling isochrone api endpoint to set display demographic and infra values
        axios({
            url: 'https://spatialapi.unmazer.ai/isochrone_api',
            method: 'POST',
            data: {
                coordinates: '' + coord.lng + ',' + coord.lat,
                profile: '' + routingProfile,
                contours_minutes: '' + contourMinutes,
                
            }
        })
            .then((response) => {
                v = true;
                if(response.data)
                {
                    Deduct (currentUser.email);
                }
                check(v);
                setOpen(false);
                //setting the values. This has to be made more dynamic, variables have to be removed, and directly response has to be passed on (check leaflet.js 's  axios)
                setRest(response.data.data.Infra.Restaurants);
                setConv(response.data.data.Infra.Grocery_Stores);
                setBus(response.data.data.Infra.Colleges);
                setPopulation(response.data.data.Demographics.Population);
                setMales(response.data.data.Demographics.Male);
                setHouses(response.data.data.Demographics.Houses);
                setCoordinates(response.data.coordinates)
            })
            .catch((Error) => {
                console.log(Error);
            })
    }

    return (
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

                        <div className='contourMinutes'>
                            Time Band<br />
                            <div className={classesforslider.root}>
                                <Slider value={contourMinutes} onChange={update} defaultValue={0} marks={marks} min={0}
                                    max={60} valueLabelDisplay="auto" required />
                            </div>
                        </div>
                        <div className='mode'>
                            Mode<br />
                            <button className={`walking ${routingProfile === 'walking' ? 'activeProfile' : null}`} onClick={() => { setRoutingProfile('walking') }}>Walking</button>
                            <button className={`cycling ${routingProfile === 'cycling' ? 'activeProfile' : null}`} onClick={() => { setRoutingProfile('cycling') }}>Cycling</button>
                            <button className={`driving ${routingProfile === 'driving' ? 'activeProfile' : null}`} onClick={() => { setRoutingProfile('driving') }}>Driving</button>
                        </div>

                        <div className='submit connectivitySubmit'>
                            <button className='submit' onClick={onSubmit}>SUBMIT</button>
                        </div>
                    </div>
                </div>

                <div className='map connectivityMap'>
                    <ConnectivityMap recenterPos={coord} coordinates={coordinates} />
                </div>
            </div>


            {!open ? " " : <Backdrop className={classes.backdrop} open={open} >
                <img src={gearbutton} style={{ width: "300px", height: "200px" }} ></img>
            </Backdrop>}



            <div className='bottom'>
                <ConnectivityCards population={flag ? population : "Loading..."} males={flag ? males : "Loading..."} houses={flag ? houses : "Loading..."} bus={flag ? bus : "Loading..."} rest={flag ? rest : "Loading..."} conv={flag ? conv : "Loading..."} />
            </div>
        </div>
    )
}

export default Connectivity
