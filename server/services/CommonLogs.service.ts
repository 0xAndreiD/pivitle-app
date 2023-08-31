import { commonLogs, CommonLogsDocument } from '../models/CommonLogs.model';
import { Types } from "mongoose";

export const create = async (body: CommonLogsDocument) => {
  if(body.type === 'reaction') {
    const exists: any = await commonLogs.findOneAndDelete({ entityId: body.entityId, userId: body.userId, value: body.value });

    if(exists) return { ...exists._doc, removed: true };

    const data = await commonLogs.findOneAndUpdate({ entityId: body.entityId, userId: body.userId }, body, { new: true }).populate('userId');
    if(data) return data;
  }
  return (await commonLogs.create(body)).populate('userId');
};

export const find = async ({ entityId }: { entityId: string }, userId: Types.ObjectId) => {
  
  console.log({ entityId, userId });
  
  const query = [
    {
      '$facet': {
        'reactionsCount': [
          {
            '$match': {
              'entityId': entityId, 
              'type': 'reaction'
            }
          }, {
            '$group': {
              '_id': '$value', 
              'count': {
                '$count': {}
              }
            }
          }
        ], 
        'myReaction': [
          {
            '$match': {
              'entityId': entityId,
              'userId': userId, 
              'type': 'reaction'
            }
          }, {
            '$group': {
              '_id': '$value', 
              'count': {
                '$count': {}
              }
            }
          }
        ],
        'comments': [{
          '$match': {
            'entityId': entityId,
            'type': 'comment'
          }
        }, {
          '$lookup': {
            'from': 'commonlogs', 
            'let': {
              'articleId': {
                '$toString': '$_id'
              }
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$entityId', '$$articleId'
                    ]
                  }, 
                  'type': 'comment'
                }
              }, {
                '$group': {
                  '_id': '$type', 
                  'count': {
                    '$count': {}
                  }
                }
              }
            ], 
            'as': 'comments'
          }
        }, {
          '$unwind': {
            'path': '$comments', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$lookup': {
            'from': 'users',
            'localField': 'userId',
            'foreignField': '_id',
            'as': 'userId'
          }
        }, {
          '$unwind': {
            'path': '$userId',
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$lookup': {
            'from': 'commonlogs', 
            'let': {
              'articleId': {
                '$toString': '$_id'
              }
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$entityId', '$$articleId'
                    ]
                  }, 
                  'type': 'reaction'
                }
              }, {
                '$group': {
                  '_id': '$value', 
                  'count': {
                    '$count': {}
                  }
                }
              }
            ], 
            'as': 'reactions'
          }
        }, {
          '$lookup': {
            'from': 'commonlogs', 
            'let': {
              'articleId': {
                '$toString': '$_id'
              }
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$entityId', '$$articleId'
                    ]
                  }, 
                  'type': 'reaction', 
                  'userId': userId
                }
              }, {
                '$group': {
                  '_id': '$value', 
                  'count': {
                    '$count': {}
                  }
                }
              }
            ], 
            'as': 'myAction'
          }
        }]
      }
    }
  ];

  const data = await commonLogs.aggregate(query);
  return data;
  // await commonLogs.find(filter).populate('userId');
}

export const update = async (filter: {}, body: any) => await commonLogs.findOneAndUpdate(filter, body, { new: true }).populate('userId');

export const deleteOne = async (filter: {}) => await commonLogs.findOneAndDelete(filter);

export default {
  create,
  find,
  update,
  deleteOne
};