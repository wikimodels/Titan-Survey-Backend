exports = async function (payload, response) {
  const headers = payload.headers;

  try {
    // const result = await context.functions.execute(
    //   "util_get_user_info_by_ip",
    //   ip
    // );

    // if (result.message) {
    //   response.setStatusCode(422);
    // } else {
    //   response.setStatusCode(200);
    // }

    response.setBody(headers["x-forwarded-for"].toString());
    response.setHeader("Content-Type", ["application/json"]);
  } catch (e) {
    response.setStatusCode(400);
    response.setHeader("Content-Type", ["application/json"]);
    response.setBody(JSON.stringify(e));
  }
};
