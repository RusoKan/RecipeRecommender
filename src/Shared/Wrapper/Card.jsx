import "./Card.css"
function Card(props) {
   return <div className="Card-Style" >
        {props.children}
    </div>
    
}
export default Card
