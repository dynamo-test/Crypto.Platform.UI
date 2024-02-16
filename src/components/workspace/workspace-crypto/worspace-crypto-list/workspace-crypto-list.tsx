import { useEffect, useState } from "react";
import { CryptoCurrency } from "../../../../models/crypto-currency";
import { HttpExchangeService } from "../../../../services/http/http-exchange.service";
import { di } from "../../../../di-container/container";
import { TOKENS } from "../../../../di-container/tokens";
import { Exchange } from "../../../../models/exchange";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  LinearProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Notification,
  NotificationType,
} from "../../../../models/notification";
import NotificationMessage from "../../../shared/notification-message";
import { Messages } from "../../../../models/messages";

var theInterval: any;

function WorkspaceCryptoList({
  cryptoCurrencyList,
  interval,
  marketId,
}: {
  cryptoCurrencyList: CryptoCurrency[];
  interval: number | undefined;
  marketId: number | undefined;
}) {
  const [dashboardList, setDashboardList] = useState<Exchange[]>();
  const [notification, setNotification] = useState<Notification>();
  const [showLoader, setShowLoader] = useState<boolean>(false);

  let exchangeService: HttpExchangeService = di.Resolver(
    TOKENS.httpExchangeService
  ) as HttpExchangeService;

  const exchnageApiCall = (id: number) => {
    setShowLoader(true);
    exchangeService
      .getById(id)
      .then((result) => {
        if (result.status === 200) {
          let dashboard: Exchange[] = [];
          result.data.forEach((exchange) => {
            cryptoCurrencyList.map((currency) => {
              if (currency.type === exchange.base) {
                let ex: Exchange = {
                  base: exchange.base,
                  quote: exchange.quote,
                  volume: exchange.volume,
                  price: exchange.price,
                  price_usd: exchange.price_usd,
                  currency: [],
                };

                ex.currency.push({
                  count: currency.count,
                  type: currency.type,
                  unitPrice: currency.unitPrice,
                  percentage:
                    (Number(currency.unitPrice) / exchange.price) * 100,
                });

                dashboard.push(ex);
              }
            });
          });

          setDashboardList(dashboard);
        } else {
          setDashboardList(undefined);
          setNotification({
            type: NotificationType.WARNING,
            message: Messages.ThereIsNoInformation,
          });
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setNotification({
          type: NotificationType.ERROR,
          message: Messages.SomethingWentWrong,
        });
        setShowLoader(false);
      });
  };
  useEffect(() => {
    if (theInterval) {
      clearInterval(theInterval);
    }
    if (marketId) {
      exchnageApiCall(marketId);
      theInterval = setInterval(async () => {
        exchnageApiCall(marketId);
      }, Number(process.env.REACT_APP_API_INTERVAL));
    } else {
      setDashboardList(undefined);
    }
  }, [marketId]);
  return (
    <div>
      <Box sx={{ width: "100%", paddingTop: "10px", height: "0.5rem" }}>
        {showLoader && <LinearProgress />}
      </Box>
      {dashboardList?.map((dashboard, dash_index) => (
        <Accordion key={dash_index} style={{ marginTop: "5px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "20%" }}>
                <b>Base: </b>
                {dashboard.base}
              </div>
              <div style={{ width: "20%" }}>
                <b>Quote: </b>
                {dashboard.quote}
              </div>
              <div style={{ width: "20%" }}>
                <b>Price: </b>
                {dashboard.price.toFixed(4)}
              </div>
              <div style={{ width: "20%" }}>
                <b>Price (USD): </b> {dashboard.price_usd.toFixed(4)}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Divider style={{ paddingBottom: "10px" }}>Currency</Divider>
            {dashboard.currency.map((currency, curr_index) => (
              <div
                key={curr_index}
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <div style={{ width: "20%" }}>
                  <b>Type of currency: </b>
                  {currency.type}
                </div>
                <div style={{ width: "20%" }}>
                  <b>Count: </b>
                  {currency.count}
                </div>
                <div style={{ width: "20%" }}>
                  <b>Price (for unit): </b>
                  {currency.unitPrice}
                </div>
                <div style={{ width: "20%" }}>
                  <b>Deviation (%): </b>
                  {currency.percentage.toFixed(2)}
                </div>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      {notification && <NotificationMessage notific={notification} />}
      {!marketId && <div>{Messages.PleaseSelectAnOption}</div>}
    </div>
  );
}

export default WorkspaceCryptoList;
