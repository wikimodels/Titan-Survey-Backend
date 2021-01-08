exports = async function (payload, response) {
  const ipAddresses = EJSON.parse(payload.body.text());
  try {
    const result = await context.functions.execute(
      "f_util_supply_ip_addresses_batch_with_locations",
      ipAddresses
    );

    if (result.message) {
      response.setStatusCode(422);
    } else {
      response.setStatusCode(200);
    }
    response.setHeader("Content-Type", ["application/json"]);
    response.setBody(JSON.stringify(result));
  } catch (e) {
    response.setStatusCode(400);
    response.setHeader("Content-Type", ["application/json"]);
    response.setBody(JSON.stringify(e));
  }
};
