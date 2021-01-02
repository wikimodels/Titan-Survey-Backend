exports = async function () {
  try {
    const dbName = await context.values.get("titanSurveyValues").db;
    const collName = await context.values.get("titanSurveyValues")
      .questionnaire;
    const coll = await context.services
      .get("mongodb-atlas")
      .db(dbName)
      .collection(collName);

    return coll;
  } catch (e) {
    // await context.functions.execute("util_db_log_error", "util_db_get_articles_collection", e);
    return Error(e.message, e);
  }
};
