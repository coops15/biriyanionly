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
        // required: true,
        // validate: {
        //     validator: pass => pass.length >= 5,
        //     message: "Password must be at least 5 characters long"
        // }
    }
}, { timestamps: true });

// Hash the password before saving the user document
// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
    
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// Compare entered password with hashed password stored in the database
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };

// Ensure the model is not recreated every time the file is imported
export const User = models?.User || model('User', UserSchema);
