exports = async function (answers) {
  try {
    const coll = await context.functions.execute(
      "util_db_get_answers_collection"
    );

    const result = await coll.insertOne(answers);

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
