import {Service} from "@/services/service";

export function imageRenameApi(data) {
    return Service.put("/api/images", data)
}

export function imageNameListApi() {
    /*
    [{
      "id": 5,
      "path": "/uploads/file/33.jpg",
      "name": "33.jpg"
    }]
     */
    return Service.get("/api/image_names")
}

export function uploadImageApi(file) {
    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('image', file);
        Service.post("/api/image", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => resolve(res))
            .catch((error) => reject(error));
    })
}