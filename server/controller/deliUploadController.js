import multer from 'multer';

export const upload = multer();
let savedData = []; // 데이터를 저장할 배열 (실제 DB 사용 가능)

export const uploadData = (req, res) => {
    console.log("클라이언트에서 받은 데이터:", req.body);

    const newData = req.body.data;
    
    if (!newData) {
        return res.status(400).json({ message: "데이터가 없습니다." });
    }

    savedData.push(newData); // 데이터를 배열에 저장
    res.json({ message: "데이터 저장 완료", data: newData });
};



export const getUp = (req,res) =>{
    console.log("저장된 데이터 요청 들어옴");
    res.json({
        message: "저장된 데이터",
        data: savedData // 저장된 데이터 배열 반환
    });
}