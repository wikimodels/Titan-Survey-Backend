exports = async function (answers) {
  try {
    const coll = await context.functions.execute(
      "f_util_db_get_answers_collection"
    );
    await coll.deleteMany({});
    const result = await coll.insertMany(answers);

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
