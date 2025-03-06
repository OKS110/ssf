import {createContext, useState, useEffect} from 'react'; 

export const MypageContext = createContext(); 

export const MypageProvider = ({children}) => {  
    const [allLike, setAllLike] = useState(()=>{
        try {
            const tokens = localStorage.getItem('token');
            return tokens ? true : false; 
          } catch (error) {
            console.error('로컬스토리지 json 데이터 파싱에러',error);
            return false; 
        }
    });

    // 토큰이 있으면 좋아요 상태 유지
    useEffect(()=>{
        const token = localStorage.getItem('token');
        setAllLike(!!token);  
    },[]);
   
    return ( 
        <MypageContext.Provider 
                value ={{ allLike, setAllLike}}>                                 
            {children}
        </MypageContext.Provider>
    );
}