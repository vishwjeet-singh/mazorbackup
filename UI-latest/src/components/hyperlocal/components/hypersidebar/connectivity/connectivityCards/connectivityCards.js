import React,{ useState } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';



const ConnectivityCards = ({ population, males, houses, bus, rest, conv }) => {
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
            <Typography color="inherit">Demographics</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
 <p className='heading'>
         <div className='heading-text'>Demographics</div> <InfoIcon  />
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
                    <div className='demographics'>
                        <h3>&nbsp;{population}&nbsp;</h3>
                        <p>Population Count</p>
                    </div>

                    <div className='affluence'>
                        <h3>&nbsp;{males}&nbsp;</h3>
                        <p>Total Males</p>
                    </div>

                    <div className='active-users'>
                        <h3>&nbsp;{houses}&nbsp;</h3>
                        <p>Total Houses</p>
                    </div>
                </div>
            </div>

            <div className='loyalty'>
                <div className='first-line'>
                    <div className='left'>
						<Tooltipinfo  placement="right"
        title={
          <React.Fragment>
            <Typography color="inherit">Infrastructure Details</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
							 <p className='heading'>
                            <div className='heading-text'>Infrastructure Details</div> <InfoIcon  />
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
                    <div className='banks'>
                        <h3>&nbsp;{bus}&nbsp;</h3>
                        <p>Business/Office Parks</p>
                    </div>
                    <div className='restaurants'>
                        <h3>&nbsp;{rest}&nbsp;</h3>
                        <p>Restaurants</p>
                    </div>
                    <div className='showrooms'>
                        <h3>&nbsp;{conv}&nbsp;</h3>
                        <p>Convenience Stores</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ConnectivityCards
