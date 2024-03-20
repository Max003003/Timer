
import React, { useState, useEffect } from 'react';

function Button({ value, onClick, disabled }) {
    return (
        <button onClick={onClick} disabled={disabled} className="Click1">
            +{value}
        </button>
    );
}

function Timer_game() {
    const [counter, setCounter] = useState(0);
    const [decreasingTimer, setDecreasingTimer] = useState(null);
    const [buttonTimers, setButtonTimers] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (counter > 0) {
                setCounter((prevCounter) => prevCounter - 1);
            } else {
                clearInterval(decreasingTimer);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [counter, decreasingTimer]);

    const handleButtonClick = (value) => {
        setCounter((prevCounter) => prevCounter + value);

        const timer = setTimeout(() => {
            setButtonTimers((prevTimers) =>
                prevTimers.filter((timer) => timer !== value)
            );
        }, 500 * value);

        setButtonTimers((prevTimers) => [...prevTimers, timer]);

        if (decreasingTimer) {
            clearInterval(decreasingTimer);
        }

        setDecreasingTimer(
            setTimeout(() => {
                setDecreasingTimer(null);
            }, 10000)
        );
    };

    return (
        <div className="App">
            <span className="Glav">Counter: {counter}</span>
            <div className="buttons">
                <Button
                    value={1}
                    onClick={() => handleButtonClick(1)}
                    disabled={buttonTimers.includes(1)}

                />
                <Button
                    value={2}
                    onClick={() => handleButtonClick(2)}
                    disabled={buttonTimers.includes(2)}
                />
                <Button
                    value={3}
                    onClick={() => handleButtonClick(3)}
                    disabled={buttonTimers.includes(3)}
                />
            </div>
        </div>
    );
}

export default Timer_game;
