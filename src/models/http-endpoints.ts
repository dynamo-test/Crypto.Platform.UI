enum CryptoEndPoint {
  base = "/crypto/",
}

enum ExchangeEndPoint {
  base = "/exchange/",
}

enum FileUploadEndPoint {
  base = "/file/upload/",
}

export const EndPoints = {
  crypto: CryptoEndPoint,
  exchange: ExchangeEndPoint,
  fileUpload: FileUploadEndPoint,
};
