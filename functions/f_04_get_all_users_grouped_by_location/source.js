exports = async function () {
  try {
    const coll = await context.functions.execute(
      "util_db_get_answers_collection"
    );

    const result = await coll
      .aggregate([
        {
          $group: {
            _id: {
              flagUrl: "$user_info.img",
              country: "$user_info.country",
              city: "$user_info.city",
            },
            count: { $sum: 1 },
          },
        },

        {
          $project: {
            _id: 0,
            flag: "$_id.flag",
            country: "$_id.country",
            city: "$_id.city",
            count: "$count",
          },
        },
      ])
      .toArray();

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
