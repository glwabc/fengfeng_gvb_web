import {Service} from "@/services/service";


export function commentRemoveApi(id){
    return Service.delete("/api/comments/" + id)
}

// 用户评论
export function commentCreateApi(data){
    return Service.post("/api/comments", data)
}