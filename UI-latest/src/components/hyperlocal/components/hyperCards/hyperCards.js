//dummy hypercards.js

import React, { useEffect, useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
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

import Download from './colleges/download';
import './hyperCards.css'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    }
}));
const Tooltipinfo = withStyles((theme) => ({
    tooltip: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',

    },
}))(Tooltip);


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

//list of infrastructure details' parameters that we load onto our multi-select dropdown. Eventually, this would have to be loaded dynamically from the api onto the multi-select dropdown.
const names = [
    'Apartments',
    'Business/Office Parks',
    'Bus Stops',
    'Cinemas',
    'Colleges',
    'PAN Shops',
    'Grocery/Convenience Stores',
    'Gyms',
    'Restaurants',
    'Police Stations',
    'Sports Clubs',
    'Warehouses'
];


//list of customer segmentation parameters that we load onto our multi-select dropdown. Eventually, this would have to be loaded dynamically from the api onto the multi-select dropdown.
const customerSegnames = [
    'Tourist Diners',
    'Health and Fitness',
    'Music Games',
    'Cinemas Visitors',
    'Bank of India Visitors',
    'Bata Visitors',
    'Beauty',
    'Dating',
    'Education',
    'Family Leisure Enthusiasts',
    'Coffee Shop Visitors',
    'Holistic Health',
    'Motorcycle Buyers',
    'Electronics Buyers',
    'Puzzle Games',
    'Pregnancy/Sexual Health Visitors',
    'Real Estate Agency Visitors',
    'Society',
    'Sporting Goods Shoppers',
    'Body Shop Visitors',
]




function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const Cards = ({ demoInfraResponse, customerSegResponse, polygonCoordinates }) => {


    //for dropdown choosing variables
    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = useState(['Business/Office Parks', 'Colleges', 'Grocery/Convenience Stores', 'Restaurants']);
    const [selectedCustomerSeg, setSelectedCustomerSeg] = useState(['Tourist Diners', 'Health and Fitness', 'Music Games', 'Cinemas Visitors'])

    const handleChangeInfra = (event) => {
        
        
         
               
          if(event.target.value.length >4)
          {
            alert("You can select 4 at max,kindly deselect others");
          }
          else
          {
            setPersonName(event.target.value);
          }

             
    };

    const handleChangeCustomerSeg = (event) => {


        if(event.target.value.length >4)
          {
            alert("You can select 4 at max,kindly deselect others");
          }
          else
          {
            setSelectedCustomerSeg(event.target.value)
          }
              
      
    }

    //whether infra card should be displayed or not
    const [displayBus, setDisplayBus] = useState(false)
    const [displayRest, setDisplayRest] = useState(false)
    const [displayConv, setDisplayConv] = useState(false)
    const [displayApt, setDisplayApt] = useState(false)
    const [displayGym, setDisplayGym] = useState(false)
    const [displayBusStop, setDisplayBusStop] = useState(false)
    const [displayCinemas, setDisplayCinemas] = useState(false)
    const [displayColleges, setDisplayColleges] = useState(false)
    const [displayPan, setDisplayPan] = useState(false)
    const [displayPolice, setDisplayPolice] = useState(false)
    const [displaySports, setDisplaySports] = useState(false)
    const [displayWarehouse, setDisplayWarehouse] = useState(false)

    //whether customerseg card should be displayed or not
    const [displayTourist, setDisplayTourist] = useState(false)
    const [displayHealth, setDisplayHealth] = useState(false)
    const [displayMusic, setDisplayMusic] = useState(false)
    const [displayCinemasVisitors, setDisplayCinemasVisitors] = useState(false)
    const [displayBank, setDisplayBank] = useState(false)
    const [displayBata, setDisplayBata] = useState(false)
    const [displayBeauty, setDisplayBeauty] = useState(false)
    const [displayDating, setDisplayDating] = useState(false)
    const [displayEducation, setDisplayEducation] = useState(false)
    const [displayLeisure, setDisplayLeisure] = useState(false)
    const [displayCoffee, setDisplayCoffee] = useState(false)
    const [displayHolistic, setDisplayHolistic] = useState(false)
    const [displayMotorcycle, setDisplayMotorcycle] = useState(false)
    const [displayElectronics, setDisplayElectronics] = useState(false)
    const [displayPuzzle, setDisplayPuzzle] = useState(false)
    const [displayPregnancy, setDisplayPregnancy] = useState(false)
    const [displayRealEstate, setDisplayRealEstate] = useState(false)
    const [displaySociety, setDisplaySociety] = useState(false)
    const [displaySportingGoods, setDisplaySportingGoods] = useState(false)
    const [displayBodyShop, setDisplayBodyShop] = useState(false)

    //ACCORDIAN LOGIC AND CODE

    const useStyles1 = makeStyles((theme) => ({
        root: {
            width: '30%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }));
    const classes1 = useStyles1();
    
    
    //To display which Infrastructure scorecard on the basis of whether that parameter is selected (if it is selected, it will be in the array 'personName'). This useEffect code block has to be reduced, has to be made more dynamic.
    useEffect(() => {
        if (personName.includes('Business/Office Parks')) {
            setDisplayBus(true)
        }
        else {
            setDisplayBus(false)
        }
        if (personName.includes('Restaurants')) {
            setDisplayRest(true)
        }
        else {
            setDisplayRest(false)
        }
        if (personName.includes('Grocery/Convenience Stores')) {
            setDisplayConv(true)
        }
        else {
            setDisplayConv(false)
        }
        if (personName.includes('Apartments')) {
            setDisplayApt(true)
        }
        else {
            setDisplayApt(false)
        }
        if (personName.includes('Gyms')) {
            setDisplayGym(true)
        }
        else {
            setDisplayGym(false)
        }
        setDisplayBusStop(personName.includes('Bus Stops') ? true : false)
        setDisplayCinemas(personName.includes('Cinemas') ? true : false)
        setDisplayColleges(personName.includes('Colleges') ? true : false)
        setDisplayPan(personName.includes('PAN Shops') ? true : false)
        setDisplayPolice(personName.includes('Police Stations') ? true : false)
        setDisplaySports(personName.includes('Sports Clubs') ? true : false)
        setDisplayWarehouse(personName.includes('Warehouses') ? true : false)
    }, [personName])


     //To display which Customer Segmentation scorecard on the basis of whether that parameter is selected (if it is selected, it will be in the array 'selectedCustomerSeg'). This useEffect code block has to be reduced, has to be made more dynamic.
    useEffect(() => {
        setDisplayTourist(selectedCustomerSeg.includes('Tourist Diners') ? true : false)
        setDisplayHealth(selectedCustomerSeg.includes('Health and Fitness') ? true : false)
        setDisplayMusic(selectedCustomerSeg.includes('Music Games') ? true : false)
        setDisplayCinemasVisitors(selectedCustomerSeg.includes('Cinemas Visitors') ? true : false)
        setDisplayBank(selectedCustomerSeg.includes('Bank of India Visitors') ? true : false)
        setDisplayBata(selectedCustomerSeg.includes('Bata Visitors') ? true : false)
        setDisplayBeauty(selectedCustomerSeg.includes('Beauty') ? true : false)
        setDisplayDating(selectedCustomerSeg.includes('Dating') ? true : false)
        setDisplayEducation(selectedCustomerSeg.includes('Education') ? true : false)
        setDisplayLeisure(selectedCustomerSeg.includes('Family Leisure Enthusiasts') ? true : false)
        setDisplayCoffee(selectedCustomerSeg.includes('Coffee Shop Visitors') ? true : false)
        setDisplayHolistic(selectedCustomerSeg.includes('Holistic Health') ? true : false)
        setDisplayMotorcycle(selectedCustomerSeg.includes('Motorcycle Buyers') ? true : false)
        setDisplayElectronics(selectedCustomerSeg.includes('Electronics Buyers') ? true : false)
        setDisplayPuzzle(selectedCustomerSeg.includes('Puzzle Games') ? true : false)
        setDisplayPregnancy(selectedCustomerSeg.includes('Pregnancy/Sexual Health Visitors') ? true : false)
        setDisplayRealEstate(selectedCustomerSeg.includes('Real Estate Agency Visitors') ? true : false)
        setDisplaySociety(selectedCustomerSeg.includes('Society') ? true : false)
        setDisplaySportingGoods(selectedCustomerSeg.includes('Sporting Goods Shoppers') ? true : false)
        setDisplayBodyShop(selectedCustomerSeg.includes('Body Shop Visitors') ? true : false)
    }, [selectedCustomerSeg])

    return (
        <>
            

            <div className='foot-traffic'>
            <div className='area'>
                <div className='first-line'>
                    <div className='left'>
                        <Tooltipinfo placement="right"
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">Area Details</Typography>
                                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                    {"It's very engaging. Right?"}
                                </React.Fragment>
                            }
                        >
                            <p className='heading'>
                                <div className='heading-text'>Area Details</div> <InfoIcon />
                            </p>
                        </Tooltipinfo>

                    </div>

                    <div className='right'>
                        <p className='date'></p><img className='icon' src="https://img.icons8.com/material/32/000000/sort-down--v1.png" />
                        <img src="https://img.icons8.com/windows/32/000000/share-2.png" className='icon' />
                        <img className='icon' src="https://img.icons8.com/windows/32/000000/download.png" />
                    </div>
                </div>


                <div className='foot-traffic-cards'>
                    <div className='area'>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Area : 'N/A'}&nbsp;</h3>
                        <p>Area (m<sup>2</sup>)</p>
                    </div>


                </div>
            </div>
                <div className='first-line'>
                    <div className='left'>
                        <Tooltipinfo placement="right"
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">Demographics</Typography>
                                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                    {"It's very engaging. Right?"}
                                </React.Fragment>
                            }
                        >
                            <p className='heading'>
                                <div className='heading-text'>Demographics</div> <InfoIcon />
                            </p>
                        </Tooltipinfo>

                    </div>

                    <div className='right'>
                        <p className='date'></p><img className='icon' src="https://img.icons8.com/material/32/000000/sort-down--v1.png" />
                        <img src="https://img.icons8.com/windows/32/000000/share-2.png" className='icon' />
                        <img className='icon' src="https://img.icons8.com/windows/32/000000/download.png" />
                    </div>
                </div>


                <div className='foot-traffic-cards'>
                    <div className='population'>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Demographics.Population : 'N/A'}&nbsp;</h3>
                        <p>Population Count</p>
                    </div>

                    <div className='males'>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Demographics['Male'] : 'N/A'}&nbsp;</h3>
                        <p>Males</p>
                    </div>

                    <div className='females'>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Demographics['Female'] : 'N/A'}&nbsp;</h3>
                        <p>Females</p>
                    </div>

                    <div className='houses'>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Demographics['Houses'] : 'N/A'}&nbsp;</h3>
                        <p>Total Houses</p>
                    </div>
                </div>
            </div>

            <div className='loyalty'>
                <div className='first-line'>
                    <div className='left'>
                        <Tooltipinfo placement="right"
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">Infrastructure Details</Typography>
                                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                    {"It's very engaging. Right?"}
                                </React.Fragment>
                            }
                        >
                            <p className='heading'>
                                <div className='heading-text'>Infrastructure Details</div> <InfoIcon />
                            </p>
                        </Tooltipinfo>

                    </div>

                    <div className='right'>
                        <p className='date'></p>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label"></InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={personName}
                                onChange={handleChangeInfra}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <img src="https://img.icons8.com/windows/32/000000/share-2.png" className='icon' />
                        <img className='icon' src="https://img.icons8.com/windows/32/000000/download.png" />
                    </div>
                </div>


                <div className='foot-traffic-cards'>
                    <div className={`apartments ${displayApt ? null : 'hide'}`}>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Infra['Apartments'] : 'N/A'}&nbsp;</h3>
                        <p>Apartments</p>
                    </div>
                    <div className={`offices ${displayBus ? null : 'hide'}`}>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Infra['Office Parks'] : 'N/A'}&nbsp;</h3>
                        <p>Business/Office Parks</p>
                    </div>
                    <div className={`conv ${displayConv ? null : 'hide'}`}>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Infra['Grocery_Stores'] : 'N/A'}&nbsp;</h3>
                        <p>Convenience Stores</p>
                    </div>
                    <div className={`gyms ${displayGym ? null : 'hide'}`}>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Infra['Gyms'] : 'N/A'}&nbsp;</h3>
                        <p>Gyms</p>
                    </div>
                    <div className={`restaurants ${displayRest ? null : 'hide'}`}>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Infra['Restaurants'] : 'N/A'}&nbsp;</h3>
                        <p>Restaurants</p>
                    </div>
                    <div className={`busStops ${displayBusStop ? null : 'hide'}`}>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Infra['Bus Stops'] : 'N/A'}&nbsp;</h3>
                        <p>Bus Stops</p>
                    </div>
                    <div className={`cinemas ${displayCinemas ? null : 'hide'}`}>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Infra['Cinemas'] : 'N/A'}&nbsp;</h3>
                        <p>Cinemas</p>
                    </div>
                    <div className={`colleges ${displayColleges ? null : 'hide'}`}>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Infra['Colleges'] : 'N/A'}&nbsp;</h3>
                        <p>Colleges <Download polygonCoordinates={polygonCoordinates} /></p>
                    </div>
                    <div className={`panshops ${displayPan ? null : 'hide'}`}>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Infra['Pan Shops'] : 'N/A'}&nbsp;</h3>
                        <p>PAN Shops</p>
                    </div>
                    <div className={`police ${displayPolice ? null : 'hide'}`}>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Infra['Police stations'] : 'N/A'}&nbsp;</h3>
                        <p>Police Stations</p>
                    </div>
                    <div className={`sportsclub ${displaySports ? null : 'hide'}`}>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Infra['Sports Club'] : 'N/A'}&nbsp;</h3>
                        <p>Sports Clubs</p>
                    </div>
                    <div className={`warehouse ${displayWarehouse ? null : 'hide'}`}>
                        <h3>&nbsp;{demoInfraResponse ? demoInfraResponse.Infra['Warehouse and Godowns'] : 'N/A'}&nbsp;</h3>
                        <p>Warehouses/Godowns</p>
                    </div>
                </div>
            </div>

            <div className='loyalty'>
                <div className='first-line'>
                    <div className='left'>
                        <Tooltipinfo placement="right"
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">Customer Segmentation</Typography>
                                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                    {"It's very engaging. Right?"}
                                </React.Fragment>
                            }
                        >
                            <p className='heading'>
                                <div className='heading-text'>Customer Segmentation</div> <InfoIcon />
                            </p>
                        </Tooltipinfo>
                    </div>

                    <div className='right'>
                        <p className='date'></p>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label"></InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={selectedCustomerSeg}
                                onChange={handleChangeCustomerSeg}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {customerSegnames.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={selectedCustomerSeg.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <img src="https://img.icons8.com/windows/32/000000/share-2.png" className='icon' />
                        <img className='icon' src="https://img.icons8.com/windows/32/000000/download.png" />
                    </div>
                </div>


                <div className='foot-traffic-cards'>
                    <div className={`tourist-diners ${displayTourist ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Tourist Diners'] : 'N/A'}&nbsp;</h3>
                        <p>Tourist Diners</p>
                    </div>

                    <div className={`health-fitness ${displayHealth ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['HEALTH AND FITNESS'] : 'N/A'}&nbsp;</h3>
                        <p>Health and Fitness</p>
                    </div>

                    <div className={`music-games ${displayMusic ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['MUSIC GAMES'] : 'N/A'}&nbsp;</h3>
                        <p>Music Games</p>
                    </div>

                    <div className={`cinemas-visitors ${displayCinemasVisitors ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Cinemas Visitors'] : 'N/A'}&nbsp;</h3>
                        <p>Cinemas Visitors</p>
                    </div>

                    <div className={`cinemas-visitors ${displayBank ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Bank of India Visitors'] : 'N/A'}&nbsp;</h3>
                        <p>Bank of India Visitors</p>
                    </div>

                    <div className={`cinemas-visitors ${displayBata ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Bata Visitors'] : 'N/A'}&nbsp;</h3>
                        <p>Bata Visitors</p>
                    </div>

                    <div className={`cinemas-visitors ${displayBeauty ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Beauty'] : 'N/A'}&nbsp;</h3>
                        <p>Beauty</p>
                    </div>

                    <div className={`cinemas-visitors ${displayDating ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['DATING'] : 'N/A'}&nbsp;</h3>
                        <p>Dating</p>
                    </div>

                    <div className={`cinemas-visitors ${displayEducation ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Education'] : 'N/A'}&nbsp;</h3>
                        <p>Education</p>
                    </div>

                    <div className={`cinemas-visitors ${displayLeisure ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Family Leisure Enthusiasts'] : 'N/A'}&nbsp;</h3>
                        <p>Family Leisure Enthusiasts</p>
                    </div>

                    <div className={`cinemas-visitors ${displayCoffee ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Frequent Coffee Shop Visitors'] : 'N/A'}&nbsp;</h3>
                        <p>Coffee Shop Visitors</p>
                    </div>

                    <div className={`cinemas-visitors ${displayHolistic ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Holistic Health'] : 'N/A'}&nbsp;</h3>
                        <p>Holistic Health</p>
                    </div>

                    <div className={`cinemas-visitors ${displayMotorcycle ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['In-Market Motorcycle Buyers'] : 'N/A'}&nbsp;</h3>
                        <p>Motorcycle Buyers</p>
                    </div>

                    <div className={`cinemas-visitors ${displayElectronics ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['In-market Electronics Buyer'] : 'N/A'}&nbsp;</h3>
                        <p>Electronics Buyers</p>
                    </div>

                    <div className={`cinemas-visitors ${displayPuzzle ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['PUZZLE GAMES'] : 'N/A'}&nbsp;</h3>
                        <p>Puzzle Games</p>
                    </div>

                    <div className={`cinemas-visitors ${displayPregnancy ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Pregnancy And Sexual Health Visitors'] : 'N/A'}&nbsp;</h3>
                        <p>Pregnancy/Sexual Health Visitors</p>
                    </div>

                    <div className={`cinemas-visitors ${displayRealEstate ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Real Estate Agency And Showroom Visitors'] : 'N/A'}&nbsp;</h3>
                        <p>Real Estate Agency Visitors</p>
                    </div>

                    <div className={`cinemas-visitors ${displaySociety ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Society'] : 'N/A'}&nbsp;</h3>
                        <p>Society</p>
                    </div>

                    <div className={`cinemas-visitors ${displaySportingGoods ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['Sporting Goods Shoppers'] : 'N/A'}&nbsp;</h3>
                        <p>Sporting Goods Shoppers</p>
                    </div>

                    <div className={`cinemas-visitors ${displayBodyShop ? null : 'hide'}`}>
                        <h3>&nbsp;{customerSegResponse ? customerSegResponse['The Body Shop Visitors'] : 'N/A'}&nbsp;</h3>
                        <p>Body Shop Visitors</p>
                    </div>
                </div>
            </div>

            <div className='heatmap'>
                <div className='first-line'>
                    <div className='left'>
                        <Tooltipinfo placement="right"
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">Explore HeatMaps</Typography>
                                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                    {"It's very engaging. Right?"}
                                </React.Fragment>
                            }
                        >
                            <p className='heading'>
                                <div className='heading-text'>Explore HeatMaps</div> <InfoIcon />
                            </p>
                        </Tooltipinfo>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cards
