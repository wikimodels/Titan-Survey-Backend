exports = async function () {
  try {
    const coll = await context.functions.execute(
      "f_util_db_get_questionnaire_collection"
    );

    const result = await coll.findOne();

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
