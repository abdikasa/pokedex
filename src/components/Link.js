import React from 'react';

const Link  = ({href, className, children, onClick}) => {
    
    return <a href={href} className={className} onClick={onClick}>
        {children}
    </a>
}

export default Link;

