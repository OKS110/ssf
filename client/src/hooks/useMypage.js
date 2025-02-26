import { useContext } from 'react'; 
import { MypageContext } from '../context/MypageContext.js';
import axios from 'axios';

export function useMypage(){   
    const {setCustomerInfo} = useContext(MypageContext); 

    /* 마이페이지 필요한 전체정보 가져오는 함수 */
    const getMypageInfo = async () => {
        const id = localStorage.getItem("user_id");
        // console.log("plzplz", id); // 값이 제대로 나오는지 확인
        const result = await axios.post("http://localhost:9000/mypage/myinfo", { 'id':id});
        setCustomerInfo('qqqqqqqqqq',result.data);

    
    return {getMypageInfo};     
}

}
