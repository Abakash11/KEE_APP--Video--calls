import React, { useState } from 'react'
import {ShipWheelIcon} from "lucide-react"
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios.mjs'



const SingupPage = () => {
  const [singupdata,setSingupData]=useState({
    fullName:'',
    email:'', 
    password:'',
  })
  
 
  // useQueryClient to manage cache and invalidate queries
  
  const queryClient = useQueryClient()
  
// useMutation to handle the signup process
  const {mutate,isPending,error}= useMutation({
    mutationFn :async()=>{
      const res = await axiosInstance.post('/auth/signup',singupdata)
      return res.data
    },
    onSuccess:(data)=>{
      queryClient.invalidateQueries({ queryKey:['authUser']});
      },
    onError:(error)=>{
      console.error("Error during signup:", error);
     
    }
  })

  // handle singup
const handelSingup = (e) => {
  e.preventDefault();
  mutate(singupdata);
}

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest" >
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100
       rounded-xl shadow-lg overflow-hidden'>
        {/* left side  */}
        <div className=' w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
        {/* logo  */}
        <div className='mb-4 flex items-center justify-center gap-2'>
          <ShipWheelIcon className=' size-9 text-primary' />
          <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary
           tracking-wider'>Keeapp</span>
        </div>
        {/* error message  */}
        {
          error && (
            <div className='alert alert-error shadow-lg mb-4'><span>{error.response.data.message}</span></div>)
        }

        <div className='w-full'>
          <form onSubmit={handelSingup}>
            <div className=' space-y-4'>
              <div>
                <h2 className=' text-lg font-semibold'>Create an Account</h2>
                <p className='text-sm opacity-70'>Join Keeapp and start your language learning adventure!</p>
              </div>

              <div className=' space-y-3'>
                {/* Fullname */}
                <div className=' form-control w-full'>
                  <label className=' label'>
                    <span>Fullname</span>
                  </label>
                  <input type="text" placeholder='John Doe' required
                  className=' input input-bordered w-full'
                  value={singupdata.fullName} onChange={(e)=>setSingupData({...singupdata,fullName:e.target.value})} />
                </div>
                {/* email  */}
                <div className=' form-control w-full'>
                  <label className=' label'>
                    <span>Email</span>
                  </label>
                  <input type="email" placeholder='Johndoe@gamil.com' required
                  className=' input input-bordered w-full'
                  value={singupdata.email} onChange={(e)=>setSingupData({...singupdata,email:e.target.value})} />
                </div>
                {/* password  */}
                <div className=' form-control w-full'>
                    <label className=' label'>
                      <span>password</span>
                    </label>
                    <input type="password" placeholder='**********' required
                    className=' input input-bordered w-full'
                    autoComplete="current-password"
                    value={singupdata.password} onChange={(e)=>setSingupData({...singupdata,password:e.target.value})} />
                    <p>password must be 6 charecter</p>
                  </div>
                {/* terms and condition  */}
                <div className=' form-control'>
                  <label className='label cursor-pointer justify-start gap-2'>
                    <input type="checkbox" className=" checkbox checkbox-sm" required id="" />
                    <span>I agree to the{" "}
                    <span className='text-primary hover:underline font-semibold'>Terms and Conditions</span>{' '}and{" "}
                    <span className='text-primary hover:underline font-semibold'>privacy policy</span>
                    
                    </span>
                  </label>
                </div>
              </div>
              
              {/*Submit button  */}
              <button type='submit' className='btn btn-primary w-full'> {isPending?'Singing up.....':'Create Account'}</button>
              <div className='flex justify-center'>already have an account? <a href="/login" className='text-primary hover:underline font-semibold'>Login</a></div> 
            </div>


          </form>
        </div>

        </div>

        {/* right side  */}

        <div className='hidden lg:flex bg-primary/10 w-full lg:w-1/2 items-center justify-center p-4 sm:p-8'>
        <div  className='relative aspect-square max-w-sm mx-auto p-8'></div>
        <img src="../../public/i.png" className=' w-full h-full object-cover' alt="" /></div>
       </div>
      
    </div>
  )
}

export default SingupPage
