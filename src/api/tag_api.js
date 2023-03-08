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