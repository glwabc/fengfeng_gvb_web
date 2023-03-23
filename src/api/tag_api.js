import {Service} from "@/services/service";


export function getTagNameListApi() {
    /*
    "data": [
    {
      "label": "后端",
      "value": "后端"
    },
    {
      "label": "教程",
      "value": "教程"
    },
    {
      "label": "golang",
      "value": "golang"
    },
    {
      "label": "node",
      "value": "node"
    }
  ],
     */
    return Service.get("/api/tag_names")
}


export function getTagArticleListApi(){
    /*
    {
  "code": 0,
  "data": {
    "count": 4,
    "list": [
      {
        "tag": "后台",
        "count": 9,
      },
      {
        "tag": "前端",
        "count": 4,
      },
      {
        "tag": "日志",
        "count": 1,
      },
      {
        "tag": "菜单",
        "count": 1,
      }
    ]
  },
  "msg": "成功"
}
     */
    return Service.get("/api/articles/tags")
}