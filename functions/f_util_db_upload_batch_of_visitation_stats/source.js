exports = async function (objs) {
  try {
    const coll = await context.functions.execute(
      "f_util_db_get_visitation_stats_collection"
    );
    await coll.deleteMany({});
    const result = await coll.insertMany(objs);

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
