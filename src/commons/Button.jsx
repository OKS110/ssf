export default function Button({className, title, width}) {
return (
        <>
            <a href="#" className={`btn ${className}`} style={{backgroundColor:"", width:width}}>{title}</a>
        </>
    );
};