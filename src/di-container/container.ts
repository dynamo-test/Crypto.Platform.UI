import { createContainer, Container } from "brandi";
import { useInjection } from "brandi-react";
import { TOKENS } from "./tokens";
import { TokenValue } from "brandi";
import { HttpFileUploadService } from "../services/http/http-fileupload.service";
import { HttpCryptoService } from "../services/http/http-crypto.service";
import { HttpExchangeService } from "../services/http/http-exchange.service";

function Register(): Container {
  const container = createContainer();

  container
    .bind(TOKENS.httpFileUploadService)
    .toInstance(HttpFileUploadService)
    .inTransientScope();

  container
    .bind(TOKENS.httpCryptoService)
    .toInstance(HttpCryptoService)
    .inTransientScope();

  container
    .bind(TOKENS.httpExchangeService)
    .toInstance(HttpExchangeService)
    .inTransientScope();

  return container;
}

function Resolver<T extends TokenValue<unknown>>(token: T): any {
  const obj = useInjection(token);

  return obj;
}

// https://brandi.js.org/brandi-react
export const di = {
  Register,
  Resolver,
};
