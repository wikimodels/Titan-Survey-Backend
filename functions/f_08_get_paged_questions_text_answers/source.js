exports = async function (questionIndex, skip, limit) {
  try {
    const coll = await context.functions.execute(
      "f_util_db_get_answers_collection"
    );

    const result = await coll
      .aggregate([
        {
          $project: {
            _id: 0,
            country: "$user_info.country",
            city: "$user_info.city",
            flag_url: "$user_info.flag_url",
            question: {
              $arrayElemAt: ["$questions", BSON.Int32(questionIndex)],
            },
            creation_date: "$creation_date",
          },
        },
        {
          $match: { "question.question_text_answer": { $ne: "" } },
        },
        {
          $project: {
            _id: 0,
            country: "$country",
            city: "$city",
            flag_url: "$flag_url",
            question_text_answer: "$question.question_text_answer",
            creation_date: "$creation_date",
          },
        },

        { $sort: { creation_date: -1 } },
        { $skip: BSON.Int32(skip) * BSON.Int32(limit) },
        { $limit: BSON.Int32(limit) },
      ])
      .toArray();

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
