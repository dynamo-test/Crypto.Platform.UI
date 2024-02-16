import { EndPoints } from "../../models/http-endpoints";
import http from "./http-common";

export class HttpFileUploadService {
  public upload = async (data: any) => {
    return http.post<any>(EndPoints.fileUpload.base, data);
  };
}
