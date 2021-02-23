exports = async function (id) {
  try {
    const coll = await context.functions.execute(
      "f_util_db_get_answers_collection"
    );

    const result = await coll.deleteOne({ _id: BSON.ObjectId(id) });

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
