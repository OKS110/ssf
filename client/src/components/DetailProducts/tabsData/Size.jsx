import { useState } from "react";
import SizeChart from "./SizeChart";

export default function Size() {
    const [isSizeOpen, setIsSizeOpen] = useState(false);

    return (
        <div style={{ backgroundColor: "lightblue", height: "auto" }}>
            사이즈 & 핏
            <ul style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
                <li style={{ margin: "0" }}><h1>XS</h1></li>
                <li style={{ margin: "0" }}><h1>S</h1></li>
                <li style={{ margin: "0" }}><h1>L</h1></li>
                <li style={{ margin: "0" }}><h1>XL</h1></li>
            </ul>
            <div className="chart-header">
                <span className="chart-unit">(단위: cm)</span>
            </div>
            <div className="size-chart">
                <SizeChart/>
            </div>
            {/*  사이즈 토글  */}
            <div style={{ marginTop: "10px", border: "1px solid gray", padding: "10px" }}>
                <button onClick={(event) => {
                        event.stopPropagation(); // 이벤트 버블링 방지
                        setIsSizeOpen(!isSizeOpen);
                    }}
                    style={{
                        width: "100%", padding: "10px", fontSize: "16px", textAlign: "left",
                        display: "flex", justifyContent: "space-between"
                    }}>
                    <p style={{ margin: 0 }}>사이즈 가이드</p>
                    <p style={{ margin: 0 }}>{isSizeOpen ? "▲" : "▼"}</p>
                </button>
                {isSizeOpen && (
                    <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f8f8f8" }}>
                        세탁 시 반드시 찬물로 손세탁하세요. 건조기 사용 시 제품 변형이 있을 수 있습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
