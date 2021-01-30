exports = async function (ipAddresses) {
  try {
    const batch = [];
    const url = `http://ip-api.com/batch`;

    for (let i = 0; i < ipAddresses.length; i++) {
      let obj = {
        fields: "query,city,country,countryCode,lat,lon,mobile",
        lang: "ru",
        query: ipAddresses[i],
      };
      batch.push(obj);
    }

    //break batch into batches by 100. Service take maximum 100 ips at one batch
    const batchSize = 100;
    const batchesBy100 = [];

    while (batch.length) {
      batchesBy100.push(batch.splice(0, batchSize));
    }

    let response = [];

    for (let i = 0; i < batchesBy100.length; i++) {
      const responseFromService = await context.http.post({
        url: url,
        body: batchesBy100[i],
        encodeBodyAsJSON: true,
      });

      const responseData = EJSON.parse(responseFromService.body.text());

      for (let j = 0; j < responseData.length; j++) {
        responseData[j].ip = responseData[j].query;
        delete responseData[j].query;
        responseData[
          j
        ].flag_url = `https://www.countryflags.io/${responseData[j].countryCode}/shiny/24.png`;

        responseData[j].deviceType =
          responseData[j].mobile === true ? "Смартфоны" : "Десктопы";
        delete responseData[j].mobile;

        response.push(responseData[j]);
      }
    }
    return response;
  } catch (e) {
    return Error(e.message, e);
  }
};
