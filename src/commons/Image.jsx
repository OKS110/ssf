import React from 'react';

export default function Image({img, alt, className}) {
    return (
        <>
            <img src={img} alt={alt} className={className} />
        </>
    );
}