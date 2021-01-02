exports = async function (ip) {
  try {
    const fields = "fields=query,city,country,countryCode,lat,lon,mobile";
    const url = `http://ip-api.com/json/${ip}?${fields}&lang=ru`;
    const response = await context.http.post({
      url: url,
    });

    const responseData = EJSON.parse(response.body.text());

    responseData.img = `https://www.countryflags.io/${responseData.countryCode}/shiny/24.png`;

    responseData.deviceType =
      responseData.mobile === true ? "Смартфоны" : "Десктопы";

    responseData.ip = responseData.query;

    delete responseData.query;
    delete responseData.mobile;

    return responseData;
  } catch (e) {
    return Error(e.message, e);
  }
};
