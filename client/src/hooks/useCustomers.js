import React, { useContext } from "react";
import axios from "axios";
import { CustomersContext } from "../context/CustomersContext.js"

export function useCustomers() {
    const { customersList, setCustomersList, customer, setCustomer,
        emailDomain, setEmailDomain, email, setEmail
    } = useContext(CustomersContext);

    /** 고객 데이터 전체 호출 **/
    const getCustomersList = async () => {
        const result = await axios.post("http://localhost:9000/customers/all");
        setCustomersList(result.data);
        // console.log(customersList);

    }

    /** 고객 별 데이터 호출 **/
    const getCustomer = async (username) => {
        try {
            const result = await axios.post("http://localhost:9000/customers/member", { username });
            setCustomer(result.data);
            const e1 = result.data.email.replace('@naver.com', '');
            const e2 = e1.replace('@gmail.com', '');
            const emailName = e2.replace('@daum.net', '');
            const emailDomainLengthCheck = result.data.email.indexOf('@');  // @ 있는 위치 찾기
            const emailDomain = result.data.email.slice(emailDomainLengthCheck + 1, result.data.email.length);
            setEmailDomain(emailDomain);
            setEmail(emailName);

        } catch (error) {
            // alert('비회원은 상품주문 후에 마이페이지 이용이 가능합니다.')
        }

        // console.log(result.data.email);   
    }


    return { getCustomersList, getCustomer };
}



