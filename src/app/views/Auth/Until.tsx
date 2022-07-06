export const Authentication = (token: any) =>{
    if(typeof window != undefined){
        localStorage.setItem("token", JSON.stringify(token))
    }
}

export const isAuthentication = () =>{
    if(typeof window != "undefined"){
        return false
    }
    if(localStorage.getItem("token")){
        return JSON.parse(localStorage.getItem("token") || "")
    }else{
        return false
    }
}