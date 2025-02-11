import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProductBlock from '../commons/ProductBlock';


export default function SectionWrap({id, title, children}) {
    const [detailList, setDetailList] = useState([]);
    // const [ulClassName, setUlClassName] = useState("");
    // const [liClassName, setLiClassName] = useState("");
    useEffect(() => {
        axios.get("http://localhost:9000/products")
        .then(res => {  
            setDetailList(res.data);
        })
        .catch(error => console.log(error));
        
    }, [])
    console.log(detailList);
    

    return (
        <section id={id} style={{backgroundColor:"green"}}>
            <h2>{title}</h2>
            {/* {id === 'skill' && <p class="description">Skills & Attributes</p>} */}
            {id === 'outer' && 
            <div className='contents-box god-lists' >
                <ul>
                    <li>
                        <ProductBlock
                             detailList={detailList}
                             ulClassName="list-col-6"
                             liClassName="god-item"/>
                    </li>
                </ul>
            </div>
            }
            {children}
        </section>
    );
}

