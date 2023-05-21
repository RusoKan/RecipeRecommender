import "./Button.css"
function Button(props) {

    return <button onClick={props.onClick} className={props.style} type={props.type}>{props.children}</button>
    
}
export default Button