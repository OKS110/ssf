import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';

export default function DeliveryUpload({type, name, value}) {
    const [inputValue, setInputValue] = useState("");

    const handleFileUpload = (e) => {
        setInputValue(e.target.value);
    }
    const handleBlur = () => {
        const formData = new FormData(); 
        formData.append(name,inputValue); 
        axios.post('http://localhost:9000/deliveryUploads',formData)
        .then(res => console.log('서버에서가져옴',res.data))
        .catch(error => console.log(error));
    }

    return (
        <div>
             <Form.Control 
                type={type} onChange={(e)=>{handleFileUpload(e)}}
                    onBlur={handleBlur} className='addDeli'
                    value = {value}
                >
            </Form.Control>
        </div>
    );
}