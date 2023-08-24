import LoadingGIF  from "../../assets/LoadingGIF.gif"
import "./Loading.css"

function Loading(props) {

    return <img className={`${props.size} ${props.use}`} src={LoadingGIF}>
        
    </img>
    
}

export default Loading