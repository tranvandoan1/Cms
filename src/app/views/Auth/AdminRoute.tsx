import { isAuthentication } from "./Until";
import { Navigate } from "react-router-dom";

const AdminRoute = (props:any) =>{
    if(isAuthentication() && isAuthentication().user.id ===1){
        return props.children;
    }else if(isAuthentication() && isAuthentication().user.id ===2){
        return props.children;
    }else{
        return <Navigate to={"/"} />
    }
}

export default AdminRoute