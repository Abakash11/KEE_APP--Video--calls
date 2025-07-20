import { useTheamStore } from '../stateStore/zustantTheamStore'
import Navbar from './Navbar'
import SideBar from './SideBar'

const Nav__SideBar = ({children,show=false}) => {


  return (
    <div  className='min-h-screen '>
        <div className="flex">  
            {show && <SideBar/>}
        
            <div className="flex flex-1 flex-col">
                <Navbar/>
                <main className='flex-1 overflow-y-auto'>{children}</main>
            </div>
        </div>
    </div>
  )
}

export default Nav__SideBar
