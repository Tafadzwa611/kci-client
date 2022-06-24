import React from 'react';
import Tabs from './Tabs';

const ClientDetail = () => {

    const card = {
        margin: "24px 24px 0",
        maxWidth: "100%",
    };

    return (

        <div className="card">
            <div style={card}>
                <Tabs />
            </div>
        </div>

    );
  }

export default ClientDetail;


