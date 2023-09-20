import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';

function Clock() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateClock = () => {
            let time = new Date();
            let hour = time.getHours();
            let min = time.getMinutes();
            let sec = time.getSeconds();
            let am_pm = hour >= 12 ? "PM" : "AM";

            if (hour > 12) {
                hour -= 12;
            }
            if (hour === 0) {
                hour = 12;
            }

            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;

            if (hour === "00") {
                hour = 12;
                am_pm = "PM";
            }

            const formattedTime = hour + ":" + min + ":" + sec + " " + am_pm;
            setCurrentTime(formattedTime);
        };

        const intervalId = setInterval(updateClock, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div id="clock"  className="fs-4 fw-semibold d-inline">
            {currentTime ? currentTime:<CircularProgress disableShrink color='inherit'/>}
        </div>
    );
}

export default Clock;
