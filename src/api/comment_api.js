import {Service} from "@/services/service";


export function commentRemoveApi(id) {
    return Service.delete("/api/comments/" + id)
}

// 用户评论
export function commentCreateApi(data) {
    return Service.post("/api/comments", data)
}

// 删除评论
export function removeCommentApi(id) {
    return Service.delete("/api/comments/" + id)
}

export function getArticleCommentListApi(id) {
    /*
     "article_id": "string",
      "comment_count": 0,
      "comment_model": "string",
      "content": "string",
      "created_at": "string",
      "digg_count": 0,
      "id": 0,
      "parent_comment_id": 0,
      "sub_comments": [
        "string"
      ],
      "user": {
        "addr": "string",
        "avatar": "string",
        "created_at": "string",
        "email": "string",
        "id": 0,
        "integral": 0,
        "ip": "string",
        "link": "string",
        "nick_name": "string",
        "role": 1,
        "sign": "string",
        "sign_status": 1,
        "tel": "string",
        "token": "string",
        "user_name": "string"
      },
      "user_id": 0
     */
    return Service.get("/api/comments/" + id)
}