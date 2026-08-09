import { useState } from "react";
import Die from "./Die";

export default function App() {
    const getAllDies = function() { 
        return new Array(10)
        .fill(0)
        .map((_, index) => 
            <Die key={index} value={Math.ceil(Math.random() * 6)} isHeld={false} />
        );
    }

    const [diesElement, setDiesElement] = useState(() => getAllDies());

    function handleClick() {
        console.log("Roll button clicked");
        setDiesElement(() => getAllDies());
    }

    return (
        <>
            <main>
                <div className="dies-container">
                    {diesElement}
                </div>

                <button className="roll-dice" onClick={handleClick}>Roll</button>
            </main> 
        </>
    );
}