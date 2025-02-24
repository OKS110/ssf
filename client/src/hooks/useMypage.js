import React,{useContext} from 'react'; 
import { MypageContext } from '../context/MypageContext.js';
import axios from 'axios';

export function useMypage(){   
    const {customerInfo,setCustomerInfo} = useContext(MypageContext); 

    /* 마이페이지 필요한 전체정보 가져오는 함수 */
    const getMypageInfo = async() => {
        const id = localStorage.getItem('user_id');
        const result = await axios.post('http://localhost:9000/mypage/myinfo',{'id':id});        
        console.log('reeeeee',result.data);        
        setCustomerInfo(result.data);     

        // return result.data;    
    }
    
    return {getMypageInfo};     
}