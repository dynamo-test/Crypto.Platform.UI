import { CryptoCurrency } from "../../models/crypto-currency";
import { EndPoints } from "../../models/http-endpoints";
import http from "./http-common";

export class HttpCryptoService {
  public getAll = async () => {
    return await http.get<Array<CryptoCurrency>>(EndPoints.crypto.base);
  };
}
