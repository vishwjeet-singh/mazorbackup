import './hypersidebar.css'

const HyperSideBar = ( { display, setDisplay } ) => {
    return(
        <div className='sidebar hypersidebar'>
            <div className={`locationInfo ${display === 'hyperMain' ? 'activeSidebar' : null}`} onClick={()=>{setDisplay('hyperMain')}}>
                <img src="https://img.icons8.com/windows/32/000000/settings.png" className='icon'/>
                <br />
                Location Information
            </div>

            <div className={`areaCompare ${display === 'areaCompare' ? 'activeSidebar' : null}`} onClick={()=>{setDisplay('areaCompare')}}>
                <img src="https://img.icons8.com/ios/32/000000/horizontal-settings-mixer--v1.png" className='icon'/>
                <br />
                Area Compare
            </div>

            <div className={`similarHood ${display === 'similarArea' ? 'activeSidebar' : null}`} onClick={()=>{setDisplay('similarArea')}}>
                <img src="https://img.icons8.com/small/32/000000/neighbour.png" className='icon' />
                <br />
                Similar Area
            </div>

            <div className='bestPlace'>
                <img src="https://img.icons8.com/small/32/000000/place-marker.png" className='icon' />
                <br />
                Best Place Search
            </div>

            <div className={`connectivity ${display === 'connectivity' ? 'activeSidebar' : null}`} onClick={ ()=>{setDisplay('connectivity')} }>
                <img src="https://img.icons8.com/small/32/000000/ground-transportation.png" className='icon' />
                <br />
                Connectivity
            </div>
        </div>
    )
}

export default HyperSideBar
