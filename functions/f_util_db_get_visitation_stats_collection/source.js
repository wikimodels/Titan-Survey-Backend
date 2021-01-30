exports = async function () {
  try {
    const dbName = await context.values.get("titanSurveyValues").db;
    const collName = await context.values.get("titanSurveyValues")
      .visitation_stats;
    const coll = await context.services
      .get("mongodb-atlas")
      .db(dbName)
      .collection(collName);

    return coll;
  } catch (e) {
    return Error(e.message, e);
  }
};
