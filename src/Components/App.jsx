import { useState } from "react";
import Die from "./Die";

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

    function handleClick(count, index) {
        if (count === -1) {
            setDies(() => getAllDies());
            setCount(prev => prev + 1);
        }
        else if (index === -1) {
            setDies((prevDies) => prevDies.map((die, index) => {
                if (die.isHeld === false) {
                    return {...die, value: Math.ceil(Math.random() * 6)}
                }
                return die;
            }));
            setCount(prev => prev + 1);
        } else {
            setDies((prevDies) => prevDies.map((die, ind) => {
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

                <button className="roll-dice" onClick={() => handleClick(count, -1)}>{count === -1 ? "New Game" : "Roll"}</button>
            </main> 
        </>
    );
}