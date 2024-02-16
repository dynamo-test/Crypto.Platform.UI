import { token } from "brandi";
import { HttpFileUploadService } from "../services/http/http-fileupload.service";
import { HttpCryptoService } from "../services/http/http-crypto.service";
import { HttpExchangeService } from "../services/http/http-exchange.service";

export const TOKENS = {
  httpFileUploadService: token<HttpFileUploadService>("httpFileUploadService"),
  httpCryptoService: token<HttpCryptoService>("httpCryptoService"),
  httpExchangeService: token<HttpExchangeService>("httpExchangeService"),
};
