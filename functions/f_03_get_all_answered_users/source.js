exports = async function () {
  try {
    const coll = await context.functions.execute(
      "f_util_db_get_answers_collection"
    );

    const result = await coll
      .aggregate([
        {
          $project: {
            _id: 0,
            flagUrl: "$user_info.img",
            ip: "$user_info.ip",
            country: "$user_info.country",
            city: "$user_info.city",
          },
        },
      ])
      .toArray();

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
