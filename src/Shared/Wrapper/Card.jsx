import "./Card.css"
function Card(props) {
   return <div className="Card-Style" onClick={props.onClick} >
        {props.children}
    </div>
    
}
export default Card
