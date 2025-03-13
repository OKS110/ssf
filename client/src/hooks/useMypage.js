import { useContext } from 'react'; 
import axios from 'axios';
import { MypageContext } from '../context/MypageContext';


export function useMypage(){   
  const { setAllLike, cid, setCid} = useContext(MypageContext);

  // favorites 테이블 전체 데이터 가져오기
  const favoriteAllData = async() => {
    const result = await axios.post('http://localhost:9000/mypage/getAllLike',{cid});   
    console.log('좋아요 전체데이터', result.data);     
        setAllLike(result.data);      
      return result.data;
  }

    
    return {favoriteAllData };     
}