import mongoose from 'mongoose';

export class SaveEventCommand {
  constructor(
      public readonly type: string,
      public readonly meta: any,
      public readonly data: any,
      public readonly _id?: mongoose.Types.ObjectId,
  ) {
  }
}
