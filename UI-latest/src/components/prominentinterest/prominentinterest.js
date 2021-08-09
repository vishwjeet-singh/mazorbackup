import React, {useState} from 'react';
import './prominentinterest.css';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
const ProminentInterest = ({ male,female,Entertainment,visitors,shopping,travel,inputPlace,Gaming,Sport_Enthusiast,Recent_International_Visit,ShopsOnline,tourist }) => {

 
	
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
      <div className='prominent-interest'>
        <div className='first-line'>
           
          <div className='left'>
          
	  <Tooltipinfo  placement="right"
        title={
          <React.Fragment>
            <Typography color="inherit">Demographic</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
		   <p className='heading'>
              <div className='heading-text'>Demographic</div> <InfoIcon  />
            </p>
      </Tooltipinfo>
        
          </div>

          <div className='right'>
            <p className='date'></p><img className='icon' src="https://img.icons8.com/material/32/000000/sort-down--v1.png" />
            <img src="https://img.icons8.com/windows/32/000000/share-2.png" className='icon' />
            <img className='icon' src="https://img.icons8.com/windows/32/000000/download.png" />
          </div>
         
        </div>
        <div className='heading'>
          <div className="heading-text-card1">Demographic</div>
          <div className='heading-text-card2'>Interest(%)</div>
            </div>
      
        <div className='interest-cards'>
        <div className='number-visits'> 
         <p>Male<h3 >&nbsp;{male}&nbsp;</h3></p>
         <p>Female<h3 >&nbsp;{female}&nbsp;</h3></p>
         <p>Entertainment<h3 >&nbsp;{Entertainment}&nbsp;</h3></p>
         <p>Mall Visitors<h3>&nbsp;{visitors}&nbsp;</h3></p>
         <p>Shopping<h3>&nbsp;{shopping}&nbsp;</h3></p>
         <p>Travel<h3>&nbsp;{travel}&nbsp;</h3></p>
         <p>Gaming<h3>&nbsp;{Gaming}&nbsp;</h3></p>
         <p>Sport Enthusiast<h3>&nbsp;{Sport_Enthusiast}&nbsp;</h3></p>
         <p>Recent International Visits<h3>&nbsp;{Recent_International_Visit}&nbsp;</h3></p>
         <p>Online Shoppers<h3>&nbsp;{ShopsOnline}&nbsp;</h3></p>
         <p>Tourist<h3>&nbsp;{tourist}&nbsp;</h3></p></div>

        
         
        </div>
      </div>
    </>
  )
}

export default ProminentInterest
