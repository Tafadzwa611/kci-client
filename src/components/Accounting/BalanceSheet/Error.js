import React from "react";

const Error = ({errorMessage}) => {
    return (
        <div className="alert alert-danger alert-dismissible">
            <h4><i className="icon fa fa-ban"></i> Alert!</h4>
            { errorMessage }
        </div>
    )
}

export default Error;