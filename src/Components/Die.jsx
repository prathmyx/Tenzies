export default function Die(props) {
    let styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    const handleClick = () => {
        props.handle(null, props.ind);
    }

    return (
        <button style={styles} onClick={handleClick}>{props.value}</button>
    )
}