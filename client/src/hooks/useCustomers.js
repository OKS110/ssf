import React, { useContext } from "react";
import axios from "axios";
import { CustomersContext } from "../context/CustomersContext.js"

export function useCustomers() {
    const { customersList, setCustomersList, customer, setCustomer } = useContext(CustomersContext);

    /** 고객 데이터 전체 호출 **/
    const getCustomersList = async() => {
        const result = await axios.post("http://localhost:9000/customers/all");
        setCustomersList(result.data);
        console.log(customersList);
        
    }

    /** 고객 별 데이터 호출 **/
    const getCustomer = async(username) => {
        const result = await axios.post("http://localhost:9000/customers/member", {username});
        
        setCustomer(result.data);
    }

    return { getCustomersList, getCustomer };
}