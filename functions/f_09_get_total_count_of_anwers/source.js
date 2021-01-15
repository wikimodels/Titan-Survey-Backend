exports = async function (questionIndex, skip, limit) {
  try {
    const coll = await context.functions.execute(
      "f_util_db_get_answers_collection"
    );

    const result = await coll.count();

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
