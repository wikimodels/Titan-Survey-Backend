exports = async function (ratingObj) {
  try {
    const coll = await context.functions.execute(
      "f_util_db_get_answers_collection"
    );

    const result = await coll
      .aggregate([
        {
          $project: {
            _id: 0,
            ip: "$user_info.ip",
            ratingColumn: {
              $arrayElemAt: ["$questions", ratingObj.ratingQuestionIndex],
            },
          },
        },
        { $unwind: "$ratingColumn.question_answers" },
        {
          $group: {
            _id: {
              ratingColumn_reply:
                "$ratingColumn.question_answers.answer_boolean_reply",
            },
            rating_avg: { $avg: "$ratingColumn.question_answers.answer_value" },
          },
        },
        {
          $project: {
            _id: 0,
            ratingColumn_reply: "$_id.ratingColumn_reply",
            rating_avg: { $round: ["$rating_avg", 2] },
          },
        },
        {
          $match: {
            $and: [{ ratingColumn_reply: true }],
          },
        },
        {
          $project: {
            rating: "$rating_avg",
          },
        },
      ])
      .toArray();

    return { title: ratingObj.title, ratings: result };
  } catch (e) {
    return Error(e.message, e);
  }
};
