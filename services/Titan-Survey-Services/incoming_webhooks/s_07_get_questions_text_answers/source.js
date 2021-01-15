exports = async function (payload, response) {
  try {
    const questionIndex = EJSON.parse(payload.body.text());

    const result = await context.functions.execute(
      "f_07_get_questions_text_answers",
      questionIndex
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
