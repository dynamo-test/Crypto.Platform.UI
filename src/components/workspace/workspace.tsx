import { useState } from "react";
import { HttpFileUploadService } from "../../services/http/http-fileupload.service";
import { di } from "../../di-container/container";
import { TOKENS } from "../../di-container/tokens";
import { Notification, NotificationType } from "../../models/notification";
import NotificationMessage from "../shared/notification-message";
import { Messages } from "../../models/messages";
import WorkspaceCrypto from "./workspace-crypto/workspace-crypto";
import DragDropFileUpload from "../shared/dnd-file-upload";
import style from "./style.module.scss";

function Workspace() {
  const [notification, setNotification] = useState<Notification>();
  const [fileUploaded, setFileUploaded] = useState<boolean>();
  const [interval, setInterval] = useState<number>();

  let fileUploadService: HttpFileUploadService = di.Resolver(
    TOKENS.httpFileUploadService
  ) as HttpFileUploadService;

  const handleFileUpload = (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      fileUploadService
        .upload(formData)
        .then((result) => {
          setFileUploaded(result.status === 200);
          setInterval(new Date().getTime() / 1000);

          if (result.status === 200) {
            setNotification({
              type: NotificationType.SUCCESS,
              message: Messages.FileWasUploaded,
            });
          }
        })
        .catch((error) => {
          setNotification({
            type: NotificationType.ERROR,
            message: Messages.SomethingWentWrong,
          });
        });
    }
  };

  return (
    <div>
      <div className={style.wrapper}>
        <DragDropFileUpload onFileUpload={handleFileUpload} />
      </div>
      {notification && <NotificationMessage notific={notification} />}
      {fileUploaded && <WorkspaceCrypto interval={interval} />}
    </div>
  );
}

export default Workspace;
