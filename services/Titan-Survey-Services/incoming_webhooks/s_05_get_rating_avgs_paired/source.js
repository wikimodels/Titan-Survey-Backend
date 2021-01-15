exports = async function (payload, response) {
  try {
    const ratingObjs = EJSON.parse(payload.body.text());
    const result = await context.functions.execute(
      "f_05_get_rating_avgs_paired",
      ratingObjs
    );

    if (result.message) {
      response.setStatusCode(422);
    } else {
      response.setStatusCode(200);
    }

    response.setBody(JSON.stringify(result));
    response.setHeader("Content-Type", ["application/json"]);
  } catch (e) {
    response.setStatusCode(400);
    response.setHeader("Content-Type", ["application/json"]);
    response.setBody(JSON.stringify(e));
  }
};
