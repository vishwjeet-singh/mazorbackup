import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import { Divider, Header, Image } from 'semantic-ui-react'
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './areaCompCards.css';


const AreaCompareCards = ({ areaCompareResponse }) => {
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
        if (areaCompareResponse) {
            console.log(areaCompareResponse);
        }
    }, [areaCompareResponse])


    return (
        <>
            {areaCompareResponse ?
                Object.keys(areaCompareResponse[0]).map((object, index) => (



                    <div className='foot-traffic'>
                        <div className='first-line'>
                            <div className='left'>
                                <Tooltipinfo placement="right"
                                    title={
                                        <React.Fragment>
                                            <Typography color="inherit">{index == 0 ? 'Area Comparison' : null}  {index == 1 ? 'Demographics' : null} {index == 2 ? 'Infrastructure Details' : null}</Typography>
                                            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                            {"It's very engaging. Right?"}
                                        </React.Fragment>
                                    }
                                >
                                    <p className='heading'>
                                        <div className='heading-text'>
                                            {index == 0 ? 'Area Comparison' : null}  {index == 1 ? 'Demographics' : null} {index == 2 ? 'Infrastructure Details' : null}
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
                        <Table stripped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Area 1</Table.HeaderCell>
                                    <Table.HeaderCell>Area 2</Table.HeaderCell>
									{areaCompareResponse.length===3? <Table.HeaderCell>Area 3</Table.HeaderCell>:null}
                                   
                                </Table.Row>
                            </Table.Header>

                            {object === "Area" ?
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell >Area (m<sup>2</sup>)</Table.Cell>
                                        <Table.Cell>{Object.values(areaCompareResponse[0][object])}
										</Table.Cell>
                                        <Table.Cell >
                                            {Object.values(areaCompareResponse[1][object])}
                                        </Table.Cell>
										{areaCompareResponse.length==3?  <Table.Cell >
                                            {Object.values(areaCompareResponse[2][object])}
                                        </Table.Cell>:null}
                                      
                                    </Table.Row>
                                </Table.Body> :
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell >
                                            {Object.keys(areaCompareResponse[0][object])[0]}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {Object.values(areaCompareResponse[0][object])[0]}
                                        </Table.Cell>
                                        <Table.Cell >
                                            {Object.values(areaCompareResponse[1][object])[0]}
                                        </Table.Cell>
										{areaCompareResponse.length==3?  <Table.Cell >
                                            {Object.values(areaCompareResponse[2][object])[0]}
                                        </Table.Cell>:null}
                                      
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell >
                                            {Object.keys(areaCompareResponse[0][object])[1]}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {Object.values(areaCompareResponse[0][object])[1]}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {Object.values(areaCompareResponse[1][object])[1]}
                                        </Table.Cell>
										{areaCompareResponse.length==3? <Table.Cell>
                                            {Object.values(areaCompareResponse[2][object])[1]}
                                        </Table.Cell>:null} 
                                        
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell >
                                            {Object.keys(areaCompareResponse[0][object])[2]}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {Object.values(areaCompareResponse[0][object])[2]}</Table.Cell>
                                        <Table.Cell >
                                            {Object.values(areaCompareResponse[1][object])[2]}
                                        </Table.Cell>
										{areaCompareResponse.length==3? <Table.Cell >
                                            {Object.values(areaCompareResponse[2][object])[2]}
                                        </Table.Cell>:null}
                                       
                                    </Table.Row>

                                    {object === "Infra" ? <Table.Row>
                                        <Table.Cell >{Object.keys(areaCompareResponse[0][object])[4]} </Table.Cell>
                                        <Table.Cell>{Object.values(areaCompareResponse[0][object])[4]}</Table.Cell>
                                        <Table.Cell >
                                            {Object.values(areaCompareResponse[1][object])[4]}
                                        </Table.Cell>
									  {areaCompareResponse.length==3? <Table.Cell >
                                            {Object.values(areaCompareResponse[2][object])[4]}
                                        </Table.Cell>:null}
                                       
                                    </Table.Row> : <Table.Row>
                                        <Table.Cell >{Object.keys(areaCompareResponse[0][object])[3]}</Table.Cell>
                                        <Table.Cell>{Object.values(areaCompareResponse[0][object])[3]}</Table.Cell>
                                        <Table.Cell >
                                            {Object.values(areaCompareResponse[1][object])[3]}
                                        </Table.Cell>
								   {areaCompareResponse.length==3? <Table.Cell >
                                            {Object.values(areaCompareResponse[2][object])[3]}
                                        </Table.Cell> :null}
                                        
                                    </Table.Row>}

                                    {object === "Infra" ? <Table.Row>
                                        <Table.Cell >
                                            {Object.keys(areaCompareResponse[0][object])[5]}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {Object.values(areaCompareResponse[0][object])[5]}
                                        </Table.Cell>
                                        <Table.Cell >
                                            {Object.values(areaCompareResponse[1][object])[5]}
                                        </Table.Cell>
									{areaCompareResponse.length==3? <Table.Cell >
                                            {Object.values(areaCompareResponse[2][object])[5]}
                                        </Table.Cell>:null}
                                        
                                    </Table.Row> : null}
                                </Table.Body>}
                        </Table>
                    </div>

                ))
                : null}


        </>
    )

}

export default AreaCompareCards
