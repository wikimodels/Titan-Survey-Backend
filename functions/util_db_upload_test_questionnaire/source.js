exports = async function (questionnaire) {
  try {
    const coll = await context.functions.execute(
      "util_db_get_questionnaire_collection"
    );
    await coll.deleteMany({});
    const result = await coll.insertOne(questionnaire);

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
