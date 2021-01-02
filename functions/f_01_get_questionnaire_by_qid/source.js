exports = async function (qid) {
  try {
    const coll = await context.functions.execute(
      "util_db_get_questionnaire_collection"
    );

    const result = await coll.findOne({ questionnaire_id: qid });

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
