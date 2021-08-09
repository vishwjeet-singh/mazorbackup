import './advertisingsidebar.css'

const AdvertisingSideBar = ( { display, setDisplay } ) => {
    return(
        <div className='sidebar advertisingsidebar'>
            <div  >
                <img src="https://img.icons8.com/windows/audience" className='icon'/>
                <br />
                Audience Creation
            </div>

            <div  >
                <img src="https://img.icons8.com/windows/billboard"className='icon'/>
                <br />
                Offline Impression
            </div>

            <div  >
                
                <img src="https://img.icons8.com/ios/30/000000/web-advertising.png" className='icon' />
                <br />
                Ad Publishing
            </div>

            <div >
                <img src="https://img.icons8.com/windows/visit" className='icon' />
                <br />
                Visit Benchmark
            </div>

        </div>
    )
}

export default AdvertisingSideBar
