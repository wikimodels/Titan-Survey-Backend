exports = async function (payload, response) {
  const questionnaire = EJSON.parse(payload.body.text());
  try {
    const result = await context.functions.execute(
      "util_db_upload_test_questionnaire",
      questionnaire
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
