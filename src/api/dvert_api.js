import {Service} from "@/services/service";


export function getAdvertListApi(params){
    return Service.get("/api/adverts", {params})
}

export function createAdvertApi(data){
    return Service.post("/api/adverts", data)
}
export function updateAdvertApi(id, data){
    return Service.put("/api/adverts/" + id, data)
}