import {Service} from "@/services/service";

export function imageRenameApi(data){
    return Service.put("/api/images", data)
}

export function imageNameListApi(){
    /*
    [{
      "id": 5,
      "path": "/uploads/file/33.jpg",
      "name": "33.jpg"
    }]
     */
    return Service.get("/api/image_names")
}