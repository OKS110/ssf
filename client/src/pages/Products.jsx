import { useEffect, useRef, useState } from "react";
// import "./Slider.css"; // CSS 파일을 따로 분리하여 스타일 적용

const InfiniteSlider = () => {
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const parent = slider.parentNode;
    const clone = slider.cloneNode(true);
    parent.appendChild(clone);
    slider.classList.add("original");
    clone.classList.add("clone");

    let animation;
    const startAnimation = () => {
      animation = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      cancelAnimationFrame(animation);
    };

    let position = 0;
    const speed = 1; // 슬라이드 속도 조절
    function animate() {
      position -= speed;
      if (Math.abs(position) >= slider.offsetWidth) {
        position = 0;
      }
      slider.style.transform = `translateX(${position}px)`;
      clone.style.transform = `translateX(${position}px)`;
      animation = requestAnimationFrame(animate);
    }

    startAnimation();

    return () => {
      stopAnimation();
      parent.removeChild(clone);
    };
  }, []);

  return (
    <div
      className="slideWrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="imgSlide" ref={sliderRef}>
        {/* 슬라이드 아이템 추가 */}
        <div className="slideItem red"></div>
        <div className="slideItem blue"></div>
        <div className="slideItem yellow"></div>
      </div>
      <div className="s2h_right">
        <div className={`hoverIndicator ${isHovered ? "hovered" : ""}`}></div>
      </div>
    </div>
  );
};

export default InfiniteSlider;