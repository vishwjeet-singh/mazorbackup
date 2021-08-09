import React, {useState} from 'react'
import UseraccountNav from './components/useraccountnav/useraccountnavbar'
import UseraccountMain from './components/useraccountMain/useraccountMain'
import '../../App.css'

const Useraccount = () => {
    //which component to display (sidebar)
    const [display, setDisplay] = useState('useraccountMain')

    return(
        <div className='useraccount'>
            <UseraccountNav setDisplay={setDisplay} />
            <UseraccountMain display={display} setDisplay={setDisplay} />
        </div>
    )
}

export default Useraccount;