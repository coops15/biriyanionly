import { model, models, Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import { type } from "os";

const UserSchema = new Schema({
    name:{type:String},
    address:{type:String},
    country:{type:String},
    postelcode:{type:Number},
    phone:{type:Number},
    image:{type:String},
    admin:{type:Boolean, default:false},
    carditems:{type:[String],default:[]},
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
         required: true,
       
    }
}, { timestamps: true });


export const User = models?.User || model('User', UserSchema);
