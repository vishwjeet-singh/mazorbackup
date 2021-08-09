//Dummy  areacompare.js

import AreaCompareMap from './areaCompareMap/areacomparemap'
import AreaCompareCards from './areaCompCards/areaCompCards'
import gearbutton from '../../hyperMain/loadingicon.gif'
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


const AreaCompare = () => {
    //infra details for hyperCards
    const [bus, setBus] = useState(0)
    const [rest, setRest] = useState(0)
    const [conv, setConv] = useState(0)
    const [gym, setGym] = useState(0)
    const [apt, setApt] = useState(0)

    //keystats
    const [population, setpopulation] = useState(0)
    const [malecount, setmalecount] = useState(0)
    const [housecount, sethousecount] = useState(0)

    //customer segmentation
    const [diners, setDiners] = useState(0)
    const [health, setHealth] = useState(0)
    const [musicGames, setMusicGames] = useState(0)

    const [flag, setflag] = useState(true);
    const [open, setOpen] = useState(false);
    const [single, setsingle] = useState(false);
    const [multi, setmulti] = useState(false);
   
    //for autocomplete input search
    const [address1, setAddress1] = useState('')
    const [coord1, setCoord1] = useState({
        lat: null,
        long: null
    })
	const [markercenter1, setmarkercenter1] = useState([0, 0])
    const handleSelect1 = async value => {
        const results = await geocodeByAddress(value)
        const latlng = await getLatLng(results[0])
        setAddress1(value)
        setCoord1(latlng)
        setmarkercenter1([latlng.lat, latlng.lng])
    }
	
	const [address2, setAddress2] = useState('')
    const [coord2, setCoord2] = useState({
        lat: null,
        long: null
    })
	const [markercenter2, setmarkercenter2] = useState([0, 0])
    const handleSelect2 = async value => {
        const results = await geocodeByAddress(value)
        const latlng = await getLatLng(results[0])
        setAddress2(value)
        setCoord2(latlng)
        setmarkercenter2([latlng.lat, latlng.lng])
    }
	
	const [address3, setAddress3] = useState('')
    const [coord3, setCoord3] = useState({
        lat: null,
        long: null
    })
	const [markercenter3, setmarkercenter3] = useState([0, 0])
    const handleSelect3 = async value => {
        const results = await geocodeByAddress(value)
        const latlng = await getLatLng(results[0])
        setAddress3(value)
        setCoord3(latlng)
        setmarkercenter3([latlng.lat, latlng.lng])
    }
	
	
	

    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#FFFFFF',
        },
    }));

    //to get response from AreaCompare map
    const [areaCompareResponse, setAreaCompareResponse] = useState(null)
	
    const setResponse=(response_data)=> {
		
		console.log(response_data);
		       
				 setAreaCompareResponse(response_data)
				
			
		
        
    }
	
	 useEffect(() => {
        if (areaCompareResponse) {
            console.log(areaCompareResponse);
        }
    }, [areaCompareResponse])

	
	const reset=()=>{
		setAreaCompareResponse([]);
	}
   

    // function setCustomerSegmentation(tourist_diners, health_fitness, music_games) {
    //     setDiners(tourist_diners)
    //     setHealth(health_fitness)
    //     setMusicGames(music_games)
    // }


    const check = (a) => {
        setflag(a);
        setOpen(!open);
    }
    const classes = useStyles();
    
    const [submit, setSubmit] = useState(false);
	
	
	const [display,setdisplay]=useState(false);
	const [displaybottom,setdisplaybottom]=useState(false);
	const activate=()=>{
	   setdisplay(!display);
	}
	const activatebottom=()=>{
	   setdisplaybottom(!displaybottom);
	}
	const setbutton=()=>{
		setSubmit(false);
	}
	
	

    return (
        <div className='flex-column'>
            <div className='center'>
                <div className='content'>
                    <p className='paragraph'>
                        Hyperlocal Intelligence provides you information about the location where your businesses are and how they could be useful for various need basis.
                    </p>

                    {/* <HyperRadioBtn /> */}

                    <div className='form'>
                        <p className='title'>Choose your location</p>

                        <div className='hypercity'>
                            Search a location<br />
							
                            <PlacesAutocomplete value={address1} onChange={setAddress1} onSelect={handleSelect1} style={{display:"inline"}}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div className='search-city'>
                                        <input {...getInputProps({ placeholder: "Type address" })} />
                                        	 <IconButton aria-label="delete" >
                                             <AddIcon onClick={activate}/>
                                                </IconButton>
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
							{display? <div>
							 <PlacesAutocomplete value={address2} onChange={setAddress2} onSelect={handleSelect2}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div className='search-city'>
                                        <input {...getInputProps({ placeholder: "Type address" })} />
                                             	 <IconButton aria-label="delete">
                                                 <AddIcon onClick={activatebottom} />
                                                    </IconButton>
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
							
								</div> : null}
						{displaybottom? <div>		
							 <PlacesAutocomplete value={address3} onChange={setAddress3} onSelect={handleSelect3}>
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
								</div>:null}
                        </div>

                        <div className='submit'>
                            <button className='submit' onClick={() => { setSubmit(true) }}>SUBMIT</button>
                        </div>
                    </div>
                </div>

                <div className='map hypermap'>
                    <AreaCompareMap setResponse={setResponse} check={check} markerObject1={coord1} submit={submit} markercenter1={markercenter1}
					markerObject1={coord1} markerObject2={coord2}	markercenter2={markercenter2} markerObject3={coord3} markercenter3={markercenter3} setbutton={setbutton} reset={reset}/>
                </div>
            </div>

            <div className='bottom'>
			 <AreaCompareCards areaCompareResponse={areaCompareResponse}/>
                
            </div>

    
            
        </div>
    )
}

export default AreaCompare
