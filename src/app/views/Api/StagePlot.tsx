import instance from "./instance"

export const getAll = () =>{
    const url = "/StagePlot"
    return instance.get(url)
}

export const get = (id:number) =>{
    const url=  `/StagePlot/${id}`
    return instance.get(url)
}

export const add = (item:any) =>{
    const url =  "/StagePlot"
    return instance.post(url,item)
}

export const edit = (item:any) =>{
    const url = `/StagePlot/${item.id}`
    return instance.put(url,item)
}

export const remove = (id:any) =>{
    const url=  `/StagePlot/${id}`
    return instance.delete(url)
}

export const garbage = (item:any) =>{
    console.log(item);
    const url = `/StagePlot/${item.id}`
    return instance.put(url,item)
}

export const filter = (value:string) =>{
    const url =`/StagePlot?name_like=${value}`
    return instance.get(url)
}