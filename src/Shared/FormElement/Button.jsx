import "./Button.css"
function Button(props) {

    return <button className={props.style} type={props.type}>{props.children}</button>
    
}
export default Button