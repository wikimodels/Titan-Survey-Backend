exports = async function (stats) {
  try {
    const coll = await context.functions.execute(
      "f_util_db_get_visitation_stats_collection"
    );

    const result = await coll.insertOne(stats);

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
