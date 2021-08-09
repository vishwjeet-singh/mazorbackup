import React, {useState} from 'react'
import AdvertisingNav from './components/advertisingnav/advertisingnavbar'
import AdvertisingMain from './components/advertisingMain/advertisingMain'
import '../../App.css'

const Advertising = () => {
    //which component to display (sidebar)
    const [display, setDisplay] = useState('advertisingMain')

    return(
        <div className='advertising'>
            <AdvertisingNav setDisplay={setDisplay} />
            <AdvertisingMain display={display} setDisplay={setDisplay} />
        </div>
    )
}

export default Advertising;