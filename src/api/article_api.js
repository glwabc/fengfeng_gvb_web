import {Service} from "@/services/service";

export function getCategoryListApi() {
    return Service.get("/api/categorys")
}

// 文章列表
export function getArticleListApi(params) {
    return Service.get("/api/articles", {params})
}

export function createArticleApi(data) {
    return Service.post("/api/articles", data)
}

export function updateArticleApi(id, data) {
    data.id = id
    return Service.put("/api/articles", data)
}

export function getArticleContentApi(id) {
    return Service.get("/api/articles/content/" + id)
}

export function getArticleIDTitle(){
    return Service.get("/api/article_id_title")
}

export function getArticleCalendarApi(){
    return Service.get("/api/articles/calendar")
}

// 获取文章详情
export function getArticleDetailApi(id){
    return Service.get("/api/articles/" + id)
}

// 文章点赞
export function articleDiggApi(id){
    return Service.post("/api/articles/digg", {id})
}

// 文章收藏
export function articleCollectApi(id){
    return Service.post("/api/articles/collects", {id})
}