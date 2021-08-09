import React, {useState} from 'react'
import HyperNav from './components/hypernav/hypernavbar'
import HyperMain from './components/hyperMain/hyperMain'
import '../../App.css'

const Hyperlocal = () => {
    //which component to display (sidebar)
    const [display, setDisplay] = useState('hyperMain')

    return(
        <div className='hyperlocal'>
            <HyperNav setDisplay={setDisplay} />
            <HyperMain display={display} setDisplay={setDisplay} />
        </div>
    )
}

export default Hyperlocal;