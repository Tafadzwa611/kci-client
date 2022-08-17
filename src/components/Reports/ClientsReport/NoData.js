import React from 'react';

const NoData = ({msg}) => {

    const nodata_container = {
        display: "block",
        textAlign: "center",
        marginTop: "20px"
    }

    const uil_triangle = {
        color: "#ffc107",
        fontSize: "2rem"
    }

    const flex = {
        display:"flex",
        columnGap:"10px",
        justifyContent:"center",
        alignItems:"center"
    }

    return (
        <div style={nodata_container} className="text-light">
            <div className="text" style={flex}>
                <i className="uil uil-exclamation-triangle" style={uil_triangle}></i> 
                <span>Oops! No data in table.</span>
            </div>
            <div>
                <span>{ msg }</span>
            </div>
        </div>
    )
}

export default NoData;