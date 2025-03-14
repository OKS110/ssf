import React, { useContext } from "react";
import axios from "axios";
import { CustomersContext } from "../context/CustomersContext.js"

export function useCustomers() {
    const {  setCustomersList, setCustomer,
         setEmailDomain, setEmail,
        
    } = useContext(CustomersContext);

    /** 고객 데이터 전체 호출 **/
    const getCustomersList = async () => {
        const result = await axios.post("http://localhost:9000/customers/all");
        setCustomersList(result.data);
        // console.log(customersList);

    }

    /** 고객 별 데이터 호출 **/
    const getCustomer = async (username) => {
        if (!username) {
            console.error("❌ getCustomer() 호출 시 username이 없습니다.");
            return;
        }
    
        try {
            console.log("🚀 API 요청: 고객 데이터 가져오기 - username:", username);
            const result = await axios.post("http://localhost:9000/customers/member", { username });
            console.log("✅ 고객 데이터 응답:", result.data);
    
            setCustomer(result.data);
            
            if (result.data?.email) {
                let emailName = result.data.email.replace('@naver.com', '')
                                                 .replace('@gmail.com', '')
                                                 .replace('@daum.net', '');
                const emailDomainLengthCheck = result.data.email.indexOf('@');
                const emailDomain = result.data.email.slice(emailDomainLengthCheck + 1, result.data.email.length);
                
                setEmailDomain(emailDomain);
                setEmail(emailName);
            }
        } catch (error) {
            console.error("❌ 고객 데이터 요청 중 오류 발생:", error);
        }
    };
    


    return { getCustomersList, getCustomer };
}
