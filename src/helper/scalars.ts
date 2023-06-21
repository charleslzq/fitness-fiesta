import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ASTNode, Kind } from 'graphql/language';

@Scalar('MongoObjectId')
export class ObjectIdScalar implements CustomScalar<string, Types.ObjectId> {
  description = 'Mongo object id scalar type';

  parseValue(value: string) {
    return new Types.ObjectId(value); // value from the client
  }

  serialize(value: Types.ObjectId) {
    return value.toHexString(); // value sent to the client
  }

  parseLiteral(ast: ASTNode) {
    if (ast.kind === Kind.STRING) {
      return new Types.ObjectId(ast.value); // value from the client query
    }
    return null;
  }
}
