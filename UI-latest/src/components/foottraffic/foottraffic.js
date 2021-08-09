import React, {useState} from 'react';
import './foottraffic.css';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
const FootTraffic = ({ visits, dwellTime, avgVisit, avgLengthofStay, loyalityCustomer, newCustomer, lostCustomer }) => {

 
	
  const Tooltipinfo = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
	
  },
}))(Tooltip);
	
  return (
    <>
      <div className='foot-traffic'>
        <div className='first-line'>
          <div className='left'>
           
	  <Tooltipinfo  placement="right"
        title={
          <React.Fragment>
            <Typography color="inherit">Foot Traffic</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
		   <p className='heading'>
              <div className='heading-text'>Foot Traffic</div> <InfoIcon  />
            </p>
      </Tooltipinfo>
        
          </div>

          <div className='right'>
            <p className='date'></p><img className='icon' src="https://img.icons8.com/material/32/000000/sort-down--v1.png" />
            <img src="https://img.icons8.com/windows/32/000000/share-2.png" className='icon' />
            <img className='icon' src="https://img.icons8.com/windows/32/000000/download.png" />
          </div>
        </div>


        <div className='loyalty-cards'>
          <div className='number-visits'>
            <h3>&nbsp;{visits}&nbsp;</h3>
            <p>Number of Visits</p>
          </div>

          {/* <div className='dwell-time'>
            <h3>&nbsp;{dwellTime}&nbsp;</h3>
            <p>Average Dwell Time</p>
          </div> */}

          <div className='avg-visit-customer'>
            <h3>&nbsp;{avgVisit}&nbsp;</h3>
            <p>Avg Visit/Customer</p>
          </div>

          <div className='length-stay'>
            <h3>&nbsp;{avgLengthofStay}&nbsp;</h3>
            <p>Average Length of Stay (min)</p>
          </div>
        </div>
      </div>

      <div className='loyalty'>
        <div className='first-line'>
          <div className='left'>
			  <Tooltipinfo  placement="right"
        title={
          <React.Fragment>
            <Typography color="inherit">Loyalty</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
		   <p className='heading'>
              <div className='heading-text'>Loyalty</div> <InfoIcon  />
            </p>
      </Tooltipinfo>
        
          </div>

          <div className='right'>
            <p className='date'></p><img className='icon' src="https://img.icons8.com/material/32/000000/sort-down--v1.png" />
            <img src="https://img.icons8.com/windows/32/000000/share-2.png" className='icon' />
            <img className='icon' src="https://img.icons8.com/windows/32/000000/download.png" />
          </div>
        </div>


        <div className='loyalty-cards'>
          <div className='loyal'>
            <h3>&nbsp;{loyalityCustomer}&nbsp;</h3>
            <p>Loyal Customer %</p>
          </div>
          <div className='new'>
            <h3>&nbsp;{newCustomer}&nbsp;</h3>
            <p>New Customer %</p>
          </div>
          <div className='lost'>
            <h3>&nbsp;{lostCustomer}&nbsp;</h3>
            <p>Lost Customer %</p>
          </div>
        </div>
      </div>
	  
	  <div className='totalvisitbyday'>
        <div className='first-line'>
          <div className='left'>
			   <Tooltipinfo  placement="right"
        title={
          <React.Fragment>
            <Typography color="inherit">Total Visits by Day</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b><u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
		   <p className='heading'>
              <div className='heading-text'>Total Visits by Day</div> <InfoIcon />
            </p>
      </Tooltipinfo>
          </div>

          <div className='right'>
            <p className='date'></p><img className='icon' src="https://img.icons8.com/material/32/000000/sort-down--v1.png" />
            <img src="https://img.icons8.com/windows/32/000000/share-2.png" className='icon' />
            <img className='icon' src="https://img.icons8.com/windows/32/000000/download.png" />
          </div>
        </div>
      </div>
    </>
  )
}

export default FootTraffic
