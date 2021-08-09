import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import { Divider, Header, Image } from 'semantic-ui-react'
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './advertisingCards.css';
import Download from './userids/download'


const AdvertisingCards = ({ advertisingResponse ,gender,polygonCoordinates,totalcount,deviceResponse,genderResponse}) => {
    const Tooltipinfo = withStyles((theme) => ({
        tooltip: {
            backgroundColor: 'white',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',

        },
    }))(Tooltip);

    

    useEffect(() => {
        if (advertisingResponse) {
            console.log(advertisingResponse);
        }
    }, [advertisingResponse])


    useEffect(() => {
        if (genderResponse) {
            console.log(genderResponse);
        }
    }, [genderResponse])


    return (
        <>
            {advertisingResponse&&genderResponse ?
            
                    <div className='foot-traffic'>
                        <div className='first-line'>
                            <div className='left'>
                                <Tooltipinfo placement="right"
                                    title={
                                        <React.Fragment>
                                            <Typography color="inherit">Audience Creation</Typography>
                                            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                            {"It's very engaging. Right?"}
                                        </React.Fragment>
                                    }
                                >
                                    <p className='heading'>
                                        <div className='heading-text'>
                                          Audience Creation  
                                        </div>
                                        <InfoIcon />
                                    </p>
                                </Tooltipinfo>
                            </div>

                            <div className='right'>
                                <p className='date'></p><img className='icon' src="https://img.icons8.com/material/32/000000/sort-down--v1.png" />
                                <img src="https://img.icons8.com/windows/32/000000/share-2.png" className='icon' />
                                <img className='icon' src="https://img.icons8.com/windows/32/000000/download.png" />
                            </div>
                           
                        </div>
                       
                              The total number of Unique Audience is {totalcount} 
                         

                        <Table stripped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Gender</Table.HeaderCell>
                                    <Table.HeaderCell>User Ids</Table.HeaderCell>
                                    <Table.HeaderCell>IOS User</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                                <Table.Body>
                            
                   {advertisingResponse.map((value, index) => (
                             <Table.Row>
                              
                         <Table.Cell>{genderResponse[index]}</Table.Cell>
                              
                               <Table.Cell>{value}</Table.Cell>
                               <Table.Cell>{deviceResponse[index]}</Table.Cell>
                               </Table.Row>
                               ))}  
                                </Table.Body> 
                        </Table>

                <div>
                <p>Download Complete Data:- <Download polygonCoordinates={polygonCoordinates} gender={gender} /></p>
               </div>
                    </div>
               
               
                : null }


        </>
    )

}

export default AdvertisingCards