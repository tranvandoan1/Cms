import instance from "./instance"

export const signup = (item:any) =>{
    const url ="/signup"
    return instance.post(url,item)
}

export const getAll = () =>{
    const url="/users"
    return instance.get(url)
}

export const get = (id:any) =>{
    const url = `/users/${id}`
    return instance.get(url)
}

export const edit = (item:any) =>{
    const url =`/users/${item.id}`
    return instance.patch(url,item)
}

export const filter = (value:string) =>{
    const url =`/users?email_like=${value}`
    return instance.get(url)
}