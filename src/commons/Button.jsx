export default function Button({className, title, width, }) {
return (
        <>
            <button className={`btn ${className}`} style={{backgroundColor:"", width:width}}>{title}</button>
        </>
    );
};