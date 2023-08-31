import { Team } from '../models/Teams/Team.model';
import { TeamMember } from '../models/Teams/TeamMembers.model';
import { Types } from "mongoose";

export const create = async ({
  createdBy,
  name
}: {
  createdBy: Types.ObjectId,
  name: string
}, members: Types.ObjectId[]) => {
  const team = await Team.create({ name, createdBy });
  
  const body = [{
    member: createdBy,
    team: team._id
  }];

  if(members) members.forEach(member => body.push({ member, team: team._id }));

  await TeamMember.insertMany(body);
  return team;
};

export const find = async (filter: {}) => await Team.find(filter);

export const findOne = async (filter: {}) => await Team.findOne(filter);

export const getTeams = async (filter: {}) => {
  
  console.log({ filter });
  
  const query = [
    {
      '$match': filter
    }, {
      '$lookup': {
        'from': 'teams', 
        'localField': 'team', 
        'foreignField': '_id', 
        'pipeline': [
          {
            '$lookup': {
              'from': 'teammembers', 
              'localField': '_id', 
              'foreignField': 'team', 
              'pipeline': [
                {
                  '$lookup': {
                    'from': 'users', 
                    'localField': 'member', 
                    'foreignField': '_id', 
                    'pipeline': [
                      {
                        '$project': {
                          'email': 1, 
                          'firstName': 1, 
                          'lastName': 1
                        }
                      }
                    ], 
                    'as': 'member'
                  }
                }, {
                  '$unwind': {
                    'path': '$member', 
                    'preserveNullAndEmptyArrays': true
                  }
                }
              ], 
              'as': 'members'
            }
          }
        ], 
        'as': 'team'
      }
    }, {
      '$unwind': {
        'path': '$team', 
        'preserveNullAndEmptyArrays': true
      }
    }
  ];
  return await TeamMember.aggregate(query);
};

export const addMembers = async ({ members, team }: { members: Types.ObjectId[], team: Types.ObjectId }) => {
  const body: object[] = [];
  members.forEach(member => body.push({ member, team }));

  await TeamMember.insertMany(body);
};

export const deleteOne = async (filter: { _id: Types.ObjectId, createdBy: Types.ObjectId }) => {
  const team = await Team.findOneAndDelete(filter);
  if(team) await TeamMember.deleteMany({ team: filter._id })
  return team;
};

export default {
  create,
  find,
  findOne,
  deleteOne,
  getTeams,
  addMembers
};