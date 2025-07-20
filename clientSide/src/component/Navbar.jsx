import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react'
import Theams from './Theams'
import { axiosInstance } from '../lib/axios.mjs'
import { useTheamStore } from '../stateStore/zustantTheamStore'

const Navbar = () => {
    const { theam } = useTheamStore()
    const {authData} = useAuthUser()
    const location =useLocation()
    const isChatPage = location.pathname?.startsWith('/chat')
    const querryClint=useQueryClient()
    const {mutate}=useMutation({
        mutationFn:async ()=>{
            const res = await axiosInstance.get('/auth/logout')
            return res.data
            
        },
        onSuccess:()=>{
            querryClint.invalidateQueries({queryKey:['authUser']})
            
        },
    })
  return (
    <nav data-theme={theam} className=' bg-base-200 border-b border-base-300 sticky top-0 z-30 h-[4.86rem]
    flex items-center justify-between px-4 sm:px-6 md:px-8'>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end w-full">
                {/* logo only if chat page  */}
                {isChatPage && (
                    <div className="pl-5">
                        <Link to='/' className="flex items-center gap-2.5">
                        <ShipWheelIcon className=' size-9 text-primary'/>
                        <span className=' text-3xl font-bold font-mono bg-clip-text text-transparent
                        bg-gradient-to-r from-primary to-secondary tracking-wider'>Keeapp</span>
                        </Link>
                    </div>
                )}

                {/* logout button */}
                <div className="flex items-center gap-3 ml-auto sm:gap-4">
                    <Link to='/notifications'>
                    <button className='btn btn-ghost btn-circle'>
                        <BellIcon className='size-6 text-base-content opacity-70' />
                    </button>
                    </Link>
                </div>
                {/* theam  */}
                <Theams/>

                {/* log Out Button  */}
                <img src={authData?.user?.profilePic} alt="profile" className='size-8 mx-3 rounded-full' />
                <button onClick={()=>mutate()} className='btn btn-ghost btn-circle'>
                    <LogOutIcon className='size-6 text-base-content opacity-70'/>
                </button>
                
            </div>
        </div>
      
    </nav>
  )
}

export default Navbar
