import {createContext, useState} from 'react'; 

export const MypageContext = createContext(); 

export const MypageProvider = ({children}) => {  
    const [customerInfo,setCustomerInfo] = useState([]);


   
    return ( 
        <MypageContext.Provider 
                value ={{customerInfo,setCustomerInfo }}>                                 
            {children}
        </MypageContext.Provider>
    );
}