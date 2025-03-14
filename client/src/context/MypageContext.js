import {createContext, useState} from 'react'; 

export const MypageContext = createContext(); 

export const MypageProvider = ({children}) => {  
    const [cid, setCid] = useState('');
    const [notMypage, setNotMypage] = useState(false);


    const [allLike, setAllLike] = useState([]);


   
    return ( 
        <MypageContext.Provider 
                value ={{ allLike, setAllLike,cid, setCid,notMypage, setNotMypage}}>                                 
            {children}
        </MypageContext.Provider>
    );
}