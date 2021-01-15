exports = async function (ratingObjs) {
  try {
    const coll = await context.functions.execute(
      "f_util_db_get_answers_collection"
    );
    // export interface RatingObj {
    //   ratingQuestionId: number;
    //   pairedQuestionId?: number;
    //   ratingQuestionIndex: number;
    //   pairedQuestionIndex?: number;
    //   title: string;
    // }
    const resutl = [];
    for (let i = 0; i < ratingObjs.length; i++) {
      const myResult = await coll
        .aggregate([
          {
            $project: {
              _id: 0,
              ip: "$user_info.ip",
              pairedColumn: {
                $arrayElemAt: ["$questions", ratingObjs[i].pairedQuestionIndex],
              },
              ratingColumn: {
                $arrayElemAt: ["$questions", ratingObjs[i].ratingQuestionIndex],
              },
            },
          },
          { $unwind: "$pairedColumn.question_answers" },
          { $unwind: "$ratingColumn.question_answers" },
          {
            $group: {
              _id: {
                pairedColumn_text: "$pairedColumn.question_answers.answer_text",
                pairedColumn_reply:
                  "$pairedColumn.question_answers.answer_boolean_reply",
                ratingColumn_reply:
                  "$ratingColumn.question_answers.answer_boolean_reply",
              },
              rating_avg: {
                $avg: "$ratingColumn.question_answers.answer_value",
              },
            },
          },
          {
            $project: {
              _id: 0,
              pairedColumn: "$_id.pairedColumn_text",
              pairedColumn_reply: "$_id.pairedColumn_reply",
              ratingColumn: "$_id.ratingColumn",
              ratingColumn_reply: "$_id.ratingColumn_reply",
              rating_avg: { $round: ["$rating_avg", 2] },
            },
          },
          {
            $match: {
              $and: [
                { pairedColumn_reply: true },
                { ratingColumn_reply: true },
              ],
            },
          },
          {
            $project: {
              category: "$pairedColumn",
              rating: "$rating_avg",
            },
          },
          { $sort: { category: 1 } },
        ])
        .toArray();
      resutl.push({ title: ratingObjs[i].title, ratings: myResult });
    }
    return resutl;
  } catch (e) {
    return Error(e.message, e);
  }
};
