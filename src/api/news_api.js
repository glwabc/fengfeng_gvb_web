import {Service} from "@/services/service";


export function getNewsApi(id, size=1, headers){
    // version
    // signaturekey
    /*
    {
      "id": "string",
      "size": 0
    }
     */

    /*
     {
      "hotValue": "string",
      "index": "string",
      "link": "string",
      "title": "string"
    }
     */
    return Service.post("/api/news", {id, size}, {headers: headers})
}