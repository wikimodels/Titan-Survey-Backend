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
            flagUrl: "$user_info.flagUrl",
            question: {
              $arrayElemAt: ["$questions", BSON.Int32(questionIndex)],
            },
            submissionDate: "$submission_date",
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
            flagUrl: "$flagUrl",
            question_text_answer: "$question.question_text_answer",
            submission_date: "$submissionDate",
          },
        },

        { $sort: { submission_date: -1 } },
        { $skip: BSON.Int32(skip) * BSON.Int32(limit)},
        { $limit: BSON.Int32(limit) },
      ])
      .toArray();

    return result;
  } catch (e) {
    return Error(e.message, e);
  }
};
