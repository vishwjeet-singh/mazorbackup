import { useEffect, useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import SimilarAreaMap from './similarAreaMap/similarAreaMap';
import SimilarAreaPolygons from './similarAreaPolygons/similarAreaPolygons'
import SimilarAreaCards from './similarAreaCards/similarAreaCards'


const SimilarArea = () => {
    //for autocomplete input search
    const [address, setAddress] = useState('')
    const [coord, setCoord] = useState({
        lat: null,
        long: null
    })
    const [markercenter, setmarkercenter] = useState([0, 0])
    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latlng = await getLatLng(results[0])
        setAddress(value)
        setCoord(latlng)
        setmarkercenter([latlng.lat, latlng.lng])
    }

    const [flag, setflag] = useState(true);
    const [open, setOpen] = useState(false);
    const check = (a) => {
        setflag(a);
        setOpen(!open);
    }
    const [submit, setSubmit] = useState(0)

    //centering the similarPolygonMap
    const [similarPolygonCenter, setSimilarPolygonCenter] = useState(null)
    const getSimilarPolygonCenter = (object) => {
        setSimilarPolygonCenter(object)
    }

    const [similarPolygons, setSimilarPolygons] = useState(null)
    const getSimilarPolygons = (geoJsons) => {
        setSimilarPolygons(geoJsons)
    }

	//to get response from polygon map currently map not used 
    const [similarAreaResponse,setsimilarAreaResponse] = useState(null)
	
    const setResponse=(response_data)=> {
		
		console.log(response_data);
		       
			setsimilarAreaResponse(response_data)
			
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
                    <SimilarAreaMap setResponse={setResponse} check={check} markerObject={coord} submit={submit} markercenter={markercenter} getSimilarPolygonCenter={getSimilarPolygonCenter} getSimilarPolygons={getSimilarPolygons} />
                </div>
            </div>

            <div className='bottom'>
                <SimilarAreaPolygons similarPolygonCenter={similarPolygonCenter} similarPolygons={similarPolygons} />
				<SimilarAreaCards similarAreaResponse={similarAreaResponse}/>
	
            </div>
        </div>
    )
}

export default SimilarArea
