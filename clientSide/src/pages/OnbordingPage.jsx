import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast, { LoaderIcon } from 'react-hot-toast'
import { CameraIcon, MapPinIcon, ShipWheelIcon } from 'lucide-react'
import { axiosInstance } from '../lib/axios.mjs'
import { LANGUAGES } from '../constants'

const OnbordingPage = () => {
  const {authData}=useAuthUser()

  const querryClint=useQueryClient()

  const [formState,setFormState]=useState({
    fullName:authData?.user?.fullName || '',
    bio:authData?.user?.bio || '',
    netiveLanguage:authData?.user?.netiveLanguage || '',
    learningLanguage:authData?.user?.learningLanguage || '',
    profilePic:authData?.user?.profilePic || '',
    location:authData?.user?.location || '',
  })

  const {mutate,isPending}=useMutation({
    mutationFn:async () => {
      const res = await axiosInstance.post('/auth/onbording', formState)
      return res.data
    },
  onSuccess:()=>{
    toast.success('Profile Onbording completed successfully!');
    querryClint.invalidateQueries({queryKey:['authUser']})

  },
  onError:(error)=>{
    let blanckFilds =error.response.data.missingFields
    toast.error(blanckFilds.map((f,index)=>(blanckFilds.length==index+1?f: f+' , ')) || 'Something went wrong!')
  }
})

  const handleOnbording = (e) => {
    e.preventDefault()
    mutate(formState)
  }

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8 '>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Compleate Your Profile</h1>
          <form onSubmit={handleOnbording} className='space-y-6'>
          {/* profilePicture  */}
          <div className='flex flex-col items-center justify-center space-y-4'>
            {/* image preview  */}
            <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
              {formState.profilePic ?
              (<img src={formState.profilePic} className='w-full h-full object-cover' />)
              :(<div className='flex items-center justify-center h-full'>
                <CameraIcon className='size-12'/>
              </div>)}
            </div>
          </div>
          {/* Fullname */}
            <div className=' form-control w-full'>
              <label className=' label'>
                <span>Fullname</span>
              </label>
              <input type="text" placeholder='John Doe' required
              className=' input input-bordered w-full'
              value={formState.fullName} onChange={(e)=>setFormState({...formState,fullName:e.target.value})} />
            </div>
            {/* bio */}
            <div className=' form-control w-full'>
              <label className=' label'>
                <span>Bio</span>
              </label>
              <textarea type="text" placeholder='John Doe' 
              className=' textarea textarea-bordered h-24'
              value={formState.bio} onChange={(e)=>setFormState({...formState,bio:e.target.value})} />
            </div>

            {/* lamguage  */}
            <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* native language  */}
              <div className=' form-control'>
                <label className=' label'>
                  <span className=' label-text'>Native Language</span>
                </label>
                <select name="netiveLanguage"
              value={formState.netiveLanguage} 
              onChange={(e)=>setFormState({...formState,netiveLanguage:e.target.value})}
              className="select select-bordered w-full">
                <option >Select Your Netive Language</option>
                {LANGUAGES.map((lan)=>(<option key={lan} value={lan}>{lan}</option>))}
              </select>
              </div>
              {/* learning language  */}
              <div className=' form-control'>
                <label className=' label'>
                  <span className=' label-text'>Learning Language</span>
                </label>
                <select name="learningLanguage"
              value={formState.learningLanguage} 
              onChange={(e)=>setFormState({...formState,learningLanguage:e.target.value})}
              className="select select-bordered w-full">
                <option value="">Select Your Learning Language</option>
                {LANGUAGES.map((lan)=>(<option key={lan} value={lan}>{lan}</option>))}
              </select>
              </div>
              
            </div>

            {/* location  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Location
                </span>
              </label>

              <div className="relative">
                <MapPinIcon className="absolute top-1 transform translate-y-1/2
                 text-base-content opacity-70 left-3 size-5"/>
                 <input type="text"
                 name='location'
                 value={formState.location}
                 className="input input-bordered w-full pl-10"
                 onChange={(e)=>setFormState({...formState,location:e.target.value})}
                 placeholder='City, Country'/>
              </div>
            </div>

            {/* submit button  */}
            <button type='submit' className='btn btn-primary w-full' disabled={isPending}>
              {isPending ? (<> <LoaderIcon className='animate-spin size-5 mr-2'/> Onbording...</> ) : 
              (<> <ShipWheelIcon className='size-5 mr-2'/> Compleate Onbording</> )}</button>

          </form>
        </div>
      </div>

    </div>
  )
}

export default OnbordingPage
