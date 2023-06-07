import axios from "axios"
import { useEffect ,useState } from "react"
function DataFetching(props) {
    const [CurrentAccountData,setCurrentAccountData]=useState(null)
    const [dataFetched, setDataFetched] = useState(false);
    useEffect(()=>{
        axios.get("/api/dashboard")
        .then(response=>{
            setCurrentAccountData(response.data)
            setDataFetched(true)
        })
        console.log("called ")
    },[])
    if (!dataFetched ) {
        return {};
    }
    else
    {
        return CurrentAccountData
    }    
    

}
export default DataFetching