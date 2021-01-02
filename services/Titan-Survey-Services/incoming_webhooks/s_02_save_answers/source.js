exports = async function (payload, response) {
  try {
    const answers = EJSON.parse(payload.body.text());
    const result = await context.functions.execute(
      "f_02_save_answers",
      answers
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
