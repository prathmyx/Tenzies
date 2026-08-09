import { useState } from "react";
import Die from "./Die";
import Confetti from 'react-confetti';

export default function App() {
    const [dies, setDies] = useState([]);
    const [count, setCount] = useState(-1);

    const getAllDies = function() { 
        return new Array(10)
        .fill(0)
        .map((_, index) => 
            ({
            key:index, 
            ind:index, 
            value:Math.ceil(Math.random() * 6),
            isHeld:false
        })
        );
    }

    const win = (dies.every((die) => die.isHeld && die.value == dies[0].value) && dies.length > 0);

    function handleClick(count, index) {
        if (count === -1) {
            setDies(() => getAllDies());
            setCount(0);
        }
        else if (index === -1) {
            if (win) {
                setDies(() => getAllDies());
                setCount(0);
            } else {
                setDies((prevDies) => prevDies.map((die, index) => {
                    if (die.isHeld === false) {
                        return {...die, value: Math.ceil(Math.random() * 6)}
                    }
                    return die;
                }));
                setCount(prev => prev + 1);
            }

        } else if (index > -1) {
            setDies((prevDies) => 
                prevDies.map((die, ind) => {
                if (ind === index) {
                    return {...die, isHeld: !die.isHeld}
                } else {
                    return die;
                }
                }
            ));
        }
    }

    return (
        <>
            <main>
                {win && <Confetti />}
                <div>
                    {win && <p>Congratulations! You won in {count} steps! Press "New Game" to start again.</p>}
                </div>
                <h1 className="title">Tenzies</h1>
                {!win ? <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p> : "" }
                <div className="dies-container">
                    {dies.map((die, index) =>
                        <Die 
                        key={index} 
                        ind={index} 
                        value={die.value}
                        isHeld={die.isHeld}
                        handle={handleClick}
                        />
                    )}
                </div>

                <button className="roll-dice" onClick={() => handleClick(count, -1)}>{win ? "New Game" : "Roll"}</button>
            </main> 
        </>
    );
}