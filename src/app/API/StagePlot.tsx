import { axiosClient } from "./Axios";


export const getAll = () =>{
    const url = "/stagePlot"
    return axiosClient.get(url)
}

export const get = (id:number) =>{
    const url=  `/stagePlot/${id}`
    return axiosClient.get(url)
}

export const add = (item:any) =>{
    const url =  "/stagePlot"
    return axiosClient.post(url,item)
}

export const edit = (item:any) =>{
    const url = `/stagePlot/${item.id}`
    return axiosClient.put(url,item)
}

export const remove = (id:any) =>{
    const url=  `/stagePlot/${id}`
    return axiosClient.delete(url)
}

export const garbage = (item:any) =>{
    console.log(item);
    const url = `/stagePlot/${item.id}`
    return axiosClient.put(url,item)
}

export const filter = (value:string) =>{
    const url =`/stagePlot?name_like=${value}`
    return axiosClient.get(url)
}