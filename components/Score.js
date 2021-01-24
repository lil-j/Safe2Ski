import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
    const [value, setValue] = React.useState(valueStart);
    React.useEffect(() => {
        setValue(valueEnd);
    }, [valueEnd]);

    return children(value);
};

function Score(props) {
    return <ProgressProvider
        valueStart={0}
        valueEnd={props.SafetyScore}
    >
        {(value) => {
            return (
                <CircularProgressbar
                    value={value}
                    text={props.SafetyScore}
                />
            );
        }}
    </ProgressProvider>;
}

export default Score;