import React from 'react';

function UpdateLimits() {
    const [limits, setLimits] = React.useState();

    React.useEffect(() => {
        async function fetch() {
        }
        fetch();
    }, []);

    if (!limits) {
        return <div>Loading...</div>
    }

    return (
        <div>UpdateLimits</div>
    )
}

export default UpdateLimits;