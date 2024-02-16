import { useEffect, useState } from "react";
import { di } from "../../../../di-container/container";
import { TOKENS } from "../../../../di-container/tokens";
import { HttpExchangeService } from "../../../../services/http/http-exchange.service";
import ComboBox from "../../../shared/combo-box";
import { ISelectModel } from "../../../shared/models/select-model";
import {
  Notification,
  NotificationType,
} from "../../../../models/notification";
import NotificationMessage from "../../../shared/notification-message";
import { Messages } from "../../../../models/messages";

function WorkspaceMarket({
  onChangeMarketValue,
}: {
  onChangeMarketValue: any;
}) {
  const [selectModelList, setSelectModelList] = useState<ISelectModel[]>();
  const [notification, setNotification] = useState<Notification>();

  let exchangeService: HttpExchangeService = di.Resolver(
    TOKENS.httpExchangeService
  ) as HttpExchangeService;

  useEffect(() => {
    var selectModel: ISelectModel[] = [];
    exchangeService
      .getAll()
      .then((result) => {
        result.data
          .filter((item) => item.active_pairs !== 0)
          .forEach((item) => {
            selectModel.push({
              label: `${item.name} (${item.country})`,
              value: item.id,
            } as ISelectModel);
          });
        setSelectModelList(selectModel);
      })
      .catch((error) => {
        setNotification({
          type: NotificationType.ERROR,
          message: Messages.SomethingWentWrong,
        });
      });
  }, []);

  function _onChangeValue(value: ISelectModel | null) {
    onChangeMarketValue(value);
  }

  return (
    <div>
      {selectModelList && (
        <ComboBox options={selectModelList} onChangeValue={_onChangeValue} />
      )}

      {notification && <NotificationMessage notific={notification} />}
    </div>
  );
}

export default WorkspaceMarket;
