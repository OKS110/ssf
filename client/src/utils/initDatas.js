import React, {useRef} from 'react';

export const initDatas = () => {
    const names = [ 'id','pwd','cpwd','username','phone','address','email'];  
    const namesKr = ['아이디','비밀번호','비밀번호확인','이름','폰번호','주소','이메일'];
    const placeHoldersKr = ['6~50자 이내의 아이디를 입력해주세요','10~20자 이내의 비밀번호를 입력해주세요',
        '비밀번호를 재입력 해주세요',
        '이름을 입력해주세요','휴대폰번호를 ( - ) 포함하여 입력해주세요',
        '주소를 입력해주세요','이메일주소를 입력해주세요'];

        

    const formData = names.reduce((acc,name)=>{
        acc[name] = '';
        return acc;
    },{});

    const labelsKr = names.reduce((acc,name,index)=>{
        acc[name] = namesKr[index];    
        return acc;
    },{});
    // console.log(labelsKr);

    const placeholder = names.reduce((acc,name,index)=>{
        acc[name] = placeHoldersKr[index]; 
        return acc;
    },{});

    return {names, formData, labelsKr, placeholder};
}

export const useRefDatas = (names) => {
    const refs = useRef (
        names.reduce((acc,name)=>{
            acc[name.concat('Ref')] = React.createRef(); 
            return acc;
        },{})
    )
    refs.current.emailDomainRef = useRef(React.createRef()); 
    // console.log('Refs',refs);

    const msgRefs = useRef(
        names.reduce((acc, name)=>{
        acc[name.concat('MsgRef')] = React.createRef();
        return acc;
        },{})
    );
    // console.log('msg',msgRefs);

    return {refs,msgRefs};
}