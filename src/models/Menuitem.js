
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    biriyaniname:{type:String},
    discription:{type:String},
    price:{type:Number},
    image:{type:String},
}, { timestamps: true });

export const Menuitem = models?.Menuitem || model('Menuitem', UserSchema);
