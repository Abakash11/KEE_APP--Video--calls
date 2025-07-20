import React from 'react'
import { Link, useLocation } from 'react-router'
import {  BellIcon, HomeIcon, ShipWheelIcon, UserIcon } from 'lucide-react'
import useAuthUser from '../hooks/useAuthUser'
import { useTheamStore } from '../stateStore/zustantTheamStore'

const SideBar = () => {
    const {authData} = useAuthUser()
    const location = useLocation()
    const pathname = location.pathname
    const { theam } = useTheamStore()
    
  return (
  
        <aside  className=' h-screen bg-base-200 border-base-300 flex-col
               lg:flex hidden border-r sticky top-0'>
                {/* logo  */}
                <div className="p-5 border-b border-base-300">
                <Link to='/' className='flex items-center gap-2.5'>
                <ShipWheelIcon className=' size-9 text-primary'/>
                    <span className=' text-3xl font-bold font-mono bg-clip-text text-transparent
                     bg-gradient-to-r from-primary to-secondary tracking-wider'>Keeapp</span>
                
                </Link>
                </div>
                {/* nav links  */}
                <nav className="flex1 p-4 space-y-1">
                  <Link to='/' className={`btn btn-ghost w-full flex gap-3 px-3 justify-start normal-case
                   ${pathname === '/' ? 'btn-active' : ''}`}>
                    <HomeIcon className='size-5 text-base-content opacity-70' />
                    <span >Home</span> 
                  </Link>
                  <Link to='/friends' className={`btn btn-ghost w-full flex gap-3 px-3 justify-start normal-case
                   ${pathname === '/friends' ? 'btn-active' : ''}`}>
                    <UserIcon className='size-5 text-base-content opacity-70' />
                    <span >Friends</span> 
                  </Link>
                  <Link to='/notifications' className={`btn btn-ghost w-full flex gap-3 px-3 justify-start normal-case
                   ${pathname === '/notifications' ? 'btn-active' : ''}`}>
                    <BellIcon className='size-5 text-base-content opacity-70' />
                    <span >Notification</span> 
                  </Link>
                </nav>

                {/* user info  */}
                <div className="p-4 border-t border-base-300 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={authData?.user?.profilePic} alt="" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{authData?.user?.fullName}</p>
                      <p><span className='size-2 bg-success rounded-full inline-block mr-1 mb-0.5'/>Online</p>
                    </div>
                  </div>
                </div>


              </aside>
      
    
  )
}

export default SideBar
