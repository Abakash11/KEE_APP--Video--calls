import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { axiosInstance } from '../lib/axios.mjs'
import { LoaderIcon, ShipWheelIcon } from 'lucide-react'

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  // tanstack query 
  const queryClient = useQueryClient()
  const {mutate, isPending, error} = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post('/auth/login', loginData)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    }
})

  // handle login
  const handleLogin = (e) => {
    e.preventDefault()
    mutate(loginData)
  }
  return (
    <div className='h-screen flex justify-center items-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full
       max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* from outer div  */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
        {/* logo  */}
        <div className="mb-4 flex items-center justify-start gap-2">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className='text-3xl font-bold font-mono bg-clip-text text-transparent
           bg-gradient-to-r from-primary to-secondary tracking-wide'>Keeapp</span>
        </div>
        {/* error message  */}
        {error && (
          <div className='alert alert-error shadow-lg mb-4'>
            <span>{error?.response?.data?.message}</span>
          </div>
        )}
        {/* login form  */}
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Welcome Back</h2>
              <p className="text-sm opacity-70">
                Sing In to your account to continue your language learning journey
              </p>
            </div>
            {/* email  */}
            <div className=' form-control w-full'>
              <label className=' label'>
                <span>Email</span>
              </label>
              <input type="email" placeholder='Johndoe@gamil.com' required
              className=' input input-bordered w-full'
              value={loginData.email} onChange={(e)=>setLoginData({...loginData,email:e.target.value})} />
            </div>
            {/* password  */}
            <div className=' form-control w-full'>
                <label className=' label'>
                  <span>password</span>
                </label>
                <input type="password" placeholder='**********' required
                className=' input input-bordered w-full'
                autoComplete="current-password"
                value={loginData.password} onChange={(e)=>setLoginData({...loginData,password:e.target.value})} />
                
            </div>
            {/*Submit button  */}
            <button type='submit' className='btn btn-primary w-full'>
               {isPending ?(<><LoaderIcon className='animate-spin size-5 mr-2'/>Singing up.....</>)
               :(<> Log In</> )}
            </button>
            <div className='flex justify-center'>don't have an account?
               <a href="/singup" className='text-primary hover:underline font-semibold'>
                Sing Up</a>
            </div> 
            

          </div>
        </form>
        </div>

        {/* right side image  */}
        <div className='hidden lg:flex bg-primary/10 w-full lg:w-1/2 items-center justify-center p-4 sm:p-8'>
        <div  className='relative aspect-square max-w-sm mx-auto p-8'></div>
        <img src="../../public/i.png" className=' w-full h-full' alt="" /></div>
       </div>

    </div>
  )
}

export default LoginPage
