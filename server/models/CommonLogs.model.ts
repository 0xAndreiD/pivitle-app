import { model, Schema, Document } from "mongoose";

export interface CommonLogsDocument extends Document {
  entityId: string,
  value: string,
  for: string,
  type: string,
  userId: Schema.Types.ObjectId,
  replies: []
}

const commonLogsSchema = new Schema<CommonLogsDocument>({
  entityId: {
    type: String
  },
  value: {
    type: String
  },
  for: {
    type: String,
    enum: ["comment", "post"]
  },
  type: {
    type: String,
    enum: ["comment", "reaction"]
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  replies: {
    type: [{
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      value: {
        type: String
      }
    }],
    default: []
  }
}, {
  timestamps: true
});

export const commonLogs = model<CommonLogsDocument>("commonLogs", commonLogsSchema);

export default commonLogs;