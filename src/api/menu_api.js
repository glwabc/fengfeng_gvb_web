import {Service} from "@/services/service";


export function createMenuApi(data) {
    return Service.post("/api/menus", data)
}

export function updateMenuApi(id, data) {
    return Service.put("/api/menus/" + id, data)
}

// 菜单详情
export function getMenuDetailApi(path) {
    /*
{
  "code": 0,
  "data": {
    "id": 1,
    "created_at": "2023-03-05T16:33:13.472+08:00",
    "title": "首页",
    "path": "/",
    "slogan": "首页",
    "abstract": [
      "枫枫知道七代博客",
      "主打轻量化"
    ],
    "abstract_time": 7,
    "banner_time": 7,
    "sort": 4,
    "banners": [
      {
        "id": 11,
        "path": "/uploads/file/223532sJUKw.jpg"
      },
      {
        "id": 10,
        "path": "/uploads/file/215953KgCPr.jpg"
      },
      {
        "id": 7,
        "path": "/uploads/file/38.jpg"
      },
      {
        "id": 5,
        "path": "/uploads/file/33.jpg"
      }
    ]
  },
  "msg": "成功"
}
     */
    return Service.get("/api/menus/detail?path=" + path)
}


export function getMenuNameListApi() {
    /*
    {
  "code": 0,
  "data": [
    {
      "id": 1,
      "title": "首页",
      "path": "/"
    },
    {
      "id": 2,
      "title": "新闻",
      "path": "/news"
    }
  ],
  "msg": "成功"
}
     */
    return Service.get("/api/menu_names")
}