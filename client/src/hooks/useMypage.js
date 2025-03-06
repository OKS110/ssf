import { useContext } from 'react'; 
import axios from 'axios';
import { MypageContext } from '../context/MypageContext';


export function useMypage(){   
  const {allLike, setAllLike} = useContext(MypageContext);

  // favorites 테이블 전체 데이터 가져오기
  const favoriteAllData = async() => {
    const result = await axios.post('http://localhost:9000/mypage/getAllLike');
    setAllLike(result.data);
  }

    
    return {favoriteAllData};     
}