import React from "react";

function Spin(props) {
    if(props.sending) {
        return <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>;
    } else {
        return <div></div>;
    }
}

export default Spin;