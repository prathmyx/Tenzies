import Die from "./Die";

export default function App() {
    const diesElement = new Array(10).fill(0).map((_, index) => {
        return <Die key={index} value={Math.ceil(Math.random() * 6)} isHeld={false} />
    });


    function handleClick() {
        console.log("clicked");
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