import React from 'react';

const NoMatch = () => {
    const style = {
        textAlign: "center",
        color: "tomato",
        fontSize: "20px"
    }
    return (
        <>
            <div style = {style}>
                <h1>Not Found</h1>
                <h1>404</h1>
            </div>
        </>
    );
};

export default NoMatch;