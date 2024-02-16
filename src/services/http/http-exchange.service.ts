import { ExchangeItem } from "../../models/exchange-item";
import { EndPoints } from "../../models/http-endpoints";
import { Market } from "../../models/market";
import http from "./http-common";

export class HttpExchangeService {
  public getAll = async () => {
    return await http.get<Array<Market>>(EndPoints.exchange.base);
  };

  public getById = async (id: number) => {
    return await http.get<Array<ExchangeItem>>(
      `${EndPoints.exchange.base}${id}/`
    );
  };
}
