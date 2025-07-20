import { useEffect, useState } from 'react'
import { useTheamStore } from '../stateStore/zustantTheamStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios.mjs'
import { UsersIcon } from 'lucide-react'
import { Link } from 'react-router-dom';
import FriendCard from '../component/FriendCard'
import RecomendedFnd from '../component/recomendedFnd'


export default function Homepage() {

  const queryClient=useQueryClient()


  const [requestsId,setRequestsId]=useState(new Set())
  // for get friends 
  const {data:friends = [],isLoading:LoadingFriends}=useQuery({
    queryKey:['friends'],
    queryFn:async ()=>{
      const res=await axiosInstance.get('/user/friends')
      return res.data
    }
  })
  // for get recomdated users 
  const {data:recomendedFriends = [],isLoading:LoadingRecomended}=useQuery({
    queryKey:['users'],
    queryFn:async ()=>{
      const res=await axiosInstance.get('/user')
      return res.data
    }
  })

  // ongoing Friend Requests 
  const {data:ongoingRequests}=useQuery({
    queryKey:['ongoingFriendRequest'],
    queryFn: async ()=>{
      const res=await axiosInstance.get('/user/ongoingFriendRequest')
      return res.data;
    }
  })

  // mutation ongoingFriendRequest
  const {mutate:sendRequestMutation,isPending}=useMutation({
    mutationFn:async function sendFriendRequest(userId) {
      const res=await axiosInstance.post(`/user/friendRequest/${userId}`)
      return res.data     
    },
    onSuccess:()=>queryClient.invalidateQueries({queryKey:['ongoingFriendRequest']})
  })

  useEffect(()=>{
    const ongoingId=new Set()
    if(ongoingRequests && ongoingRequests.length>0){
      ongoingRequests.forEach((req) => {
        
        ongoingId.add(req.receiver._id)
      });
      setRequestsId(ongoingId)
    }
  },[ongoingRequests])

  return (
    <div  className='h-full' >

      <div className="p-4 sm:6 lg:p-8">
        <div className="mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
            
            <Link to="/notifications" className='btn btn-sm btn-outline'>
              <UsersIcon  className=' mr-2 size-4'/>
              Friend Requests
            </Link>
          </div>

          {LoadingFriends?(<div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'/>
          </div>)
          :
          friends.length === 0 ?(<p>No Friends Yet</p>):(
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {friends.map((friend)=>
                  (<FriendCard key={friend._id} friend={friend}/>)
                )}
            </div>
          )}

          <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your profile
                </p>
              </div>
            </div>
          </div>

          {LoadingRecomended ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recomendedFriends.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recomendedFriends.map((user) => (
              

               <RecomendedFnd key={user._id} user={user} sendRequestMutation={sendRequestMutation} isPending={isPending} hasRequestBeenSent={requestsId.has(user._id)}/>
              ))}
            </div>
          )}
        </section>
        </div>
      </div>
    </div>
  )
}
