import React, {useState} from 'react';
import './crossshopping.css';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ReactFlow from 'react-flow-renderer';
const Crossshopping = ({prename,prevalue,postname,postvalue }) => {

  const [isDraggable, setIsDraggable] = useState(false);
    const elements = [
      // Prior
      { id: '1', data: { label: (
        <>
          {prename[0]}   <strong>{prevalue[0]}%</strong>
        </>
      ), }, position: { x: 70, y:50 } , style: {
        background: '#D6D5E6',
        color: '#333',
        border: '1px solid #222138',
        width: 180,
      }
    },
      { id: '2', data: { label: (
        <>
          {prename[1]}    <strong>{prevalue[1]}%</strong>
        </>
      ), }, position: { x: 70, y: 150 } , style: {
        background: '#D6D5E6',
        color: '#333',
        border: '1px solid #222138',
        width: 180,
      }},
      { id: '0', data: { label: (
        <>
          
        </>
      ), }, position:{ x: 300, y: 150 } ,style:{borderRadius:'50%', width:'100px',height:'100px',background:'#D6D5E6'}},
  
      //POST
    
      { id: '3', data: { label: (
        <>
          {postname[0]}   <strong>{postvalue[0]}%</strong>
        </>
      ), }, position: { x: 450, y: 50} , style: {
        background: '#D6D5E6',
        color: '#333',
        border: '1px solid #222138',
        width: 180,
      }
    },
    { id: '4', data: { label: (
      <>
        {postname[1]}   <strong>{postvalue[1]}%</strong>
      </>
    ), }, position: { x: 450, y: 150 } , style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    }
  },
  { id: '5', data: { label: (
    <>
      {postname[2]}   <strong>{postvalue[2]}%</strong>
    </>
  ), }, position: { x: 450, y: 250 } , style: {
    background: '#D6D5E6',
    color: '#333',
    border: '1px solid #222138',
    width: 180,
  }
  },
  
      { id: 'e1-0', source: '1', target: '0', style: { stroke: '#4C56BA' }},
      {id:'e2-0',source:'2',target:'0',style: { stroke: '#4C56BA'}},
      { id: 'e3-0', source: '3', target: '0', style: { stroke: '#4C56BA' }},
      {id:'e4-0',source:'4',target:'0',style: { stroke: '#4C56BA'}},
      { id: 'e5-0', source: '5', target: '0', style: { stroke: '#4C56BA' }}
      
    ]
  

  
  
  const flowStyles = { height: 500 };
  const Tooltipinfo = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
	
  },
}))(Tooltip);
	console.log(prename);
  return (
    <>
      <div className='cross-shopping'>
        <div className='first-line'>
           
          <div className='left'>
          
	  <Tooltipinfo  placement="right"
        title={
          <React.Fragment>
            <Typography color="inherit">Cross-Shopping</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
		   <p className='heading-shopping'>
              <div className='heading-text'>Cross-Shopping</div> <InfoIcon  />
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
          <div className="heading-text-card1-shopping">Prior</div>
          <div className='heading-text-card2-shopping'>Post</div>
            </div>
          <div className='shopping-data'>
          <ReactFlow elements={elements} style={flowStyles} nodesDraggable={isDraggable}/>
          </div>
      </div>
    </>
  )
}

export default Crossshopping
