exports = async function (payload, response) {
  try {
    const { questionIndex, skip, limit } = payload.query;
    const result = await context.functions.execute(
      "f_08_get_paged_questions_text_answers",
      questionIndex,
      skip,
      limit
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
