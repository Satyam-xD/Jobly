import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.auth);
    
    useEffect(()=>{
        // Only fetch companies if user is authenticated
        if (user) {
            const fetchCompanies = async () => {
                try {
                    const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                    console.log('called');
                    if(res.data.success){
                        dispatch(setCompanies(res.data.companies));
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchCompanies();
        }
    },[user])
}

export default useGetAllCompanies