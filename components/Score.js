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
                    text={value}
                    styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0.25,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                        // Text size
                        textSize: '16px',
                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 1,
                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',
                        // Colors
                        pathColor: value < 70 ? "#D2433E" : value >= 90 ? "#3ED246" : "#FFEC4E",
                        textColor: value < 70 ? "#D2433E" : value >= 90 ? "#3ED246" : "#FFEC4E",
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                    })}
                />
            );
        }}
    </ProgressProvider>;
}

export default Score;
