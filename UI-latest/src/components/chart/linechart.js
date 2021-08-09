import {useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoIcon from '@material-ui/icons/Info';
import Chart from 'react-apexcharts'

import './linechart.css'

const LineChart = ({ options, series }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // useEffect(() => { DO NOT DELETE THIS
    //     async getAPIdata(){
    //         if (store) {
    //             let xaxis = []
    //             await axios({
    //                 url: 'https://obscure-dawn-05054.herokuapp.com/totalvisitbyday',
    //                 method: 'GET'
    //             })
    //                 .then((response) => {
    //                     console.log(response.data);

    //                     response.data.map(object => {
    //                         if (object.name === store) {
    //                             for (let i = 0; i < object.visit.length; i++) {
    //                                 xaxis.push(i + 1)
    //                             }
    //                             setOptions({
    //                                 'chart': {
    //                                     'id': "basic-line"
    //                                 },
    //                                 'xaxis': {
    //                                     'categories': xaxis //array
    //                                 }
    //                             })
    //                             setSeries([
    //                                 {
    //                                     name: "Visits",
    //                                     data: object.visit //array
    //                                 }
    //                             ])
    //                             break
    //                         }
    //                     })
    //                 })
    //                 .catch((Error) => {
    //                     console.log(Error);
    //                 })
    //         }
    //     }
    //     getAPIdata()
    // }, [store])


    return (
        <div id='section1' className='line-chart'>            
            <Chart
                options={options}
                series={series}
                type="line"
                width="70%"
            />
        </div>
    )
}

export default LineChart