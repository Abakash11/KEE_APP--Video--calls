import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios.mjs"

const useAuthUser = () => {
const {data:authData,isLoading} = useQuery({
  queryKey:['authUser'],
  queryFn:async()=>{
    try {
      const res = await axiosInstance.get('/auth/me')
      return res.data
    } catch (error) {
      console.error("Error fetching useAuthuser data:", error)
      return null
    }
  },
 retry: false,
})
return {authData, isLoading}
}

export default useAuthUser
