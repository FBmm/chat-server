import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /1\d{10}/.test(v);
      },
      message: '{VALUE} is not a valid phone number!',
    },
  })
  mobile: string;

  @Prop({ default: '000000' })
  pass: string;

  @Prop({ required: true })
  passSalt: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
