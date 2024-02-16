import { useEffect, useState } from "react";
import { HttpCryptoService } from "../../../services/http/http-crypto.service";
import { di } from "../../../di-container/container";
import { TOKENS } from "../../../di-container/tokens";
import { CryptoCurrency } from "../../../models/crypto-currency";
import WorkspaceCryptoList from "./worspace-crypto-list/workspace-crypto-list";
import WorkspaceMarket from "./workspace-market/workspace-market";
import style from "./style.module.scss";
import { ISelectModel } from "../../shared/models/select-model";
import { Notification, NotificationType } from "../../../models/notification";
import NotificationMessage from "../../shared/notification-message";
import { Messages } from "../../../models/messages";

function WorkspaceCrypto({ interval }: { interval: number | undefined }) {
  const [marketId, setMarketId] = useState<number>();
  const [cryptoCurrencyList, setCryptoCurrencyList] =
    useState<CryptoCurrency[]>();
  const [notification, setNotification] = useState<Notification>();

  let cryptoService: HttpCryptoService = di.Resolver(
    TOKENS.httpCryptoService
  ) as HttpCryptoService;

  useEffect(() => {
    cryptoService
      .getAll()
      .then((result) => {
        setCryptoCurrencyList(result.data);
      })
      .catch((error) => {
        setNotification({
          type: NotificationType.ERROR,
          message: Messages.SomethingWentWrong,
        });
      });
  }, [interval]);

  function _onChangeMarketValue(value: ISelectModel | null) {
    setMarketId(value?.value);
  }

  return (
    <div>
      {cryptoCurrencyList && (
        <div>
          <div className={style.wrapper}>
            <WorkspaceMarket onChangeMarketValue={_onChangeMarketValue} />
          </div>
          <div>
            <WorkspaceCryptoList
              cryptoCurrencyList={cryptoCurrencyList}
              interval={interval}
              marketId={marketId}
            />
          </div>
        </div>
      )}
      {notification && <NotificationMessage notific={notification} />}
    </div>
  );
}

export default WorkspaceCrypto;
