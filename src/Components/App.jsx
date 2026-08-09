import { useState } from "react";
import Die from "./Die";

export default function App() {
    const [diesElement, setDiesElement] = useState(null);
    const [count, setCount] = useState(-1);

    const getAllDies = function() { 
        return new Array(10)
        .fill(0)
        .map((_, index) => 
            <Die key={index} ind={index} value={Math.ceil(Math.random() * 6)} isHeld={false} handle={handleClick}/>
        );
    }

    function handleClick(count, index) {
        if (count === -1) {
            setDiesElement(() => getAllDies());
            setCount(prev => prev + 1);
        }
        else if (index === -1) {
            setDiesElement((prevDies) => prevDies.map((die, index) => {
                if (die.props.isHeld === false) {
                    return <Die key={index} ind={index} value={Math.ceil(Math.random() * 6)} isHeld={false} handle={handleClick}/>;
                }
                return die;
            }));
            setCount(prev => prev + 1);
        } else {
            setDiesElement((prevDies) => prevDies.map((die, ind) => {
                if (ind === index) {
                    return <Die key={ind} ind={ind} value={die.props.value} isHeld={!die.props.isHeld} handle={handleClick}/>;
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
                    {diesElement}
                </div>

                <button className="roll-dice" onClick={() => handleClick(count, -1)}>{count === -1 ? "New Game" : "Roll"}</button>
            </main> 
        </>
    );
}