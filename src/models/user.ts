import mongoose,{Schema,models,Document, Model} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUSER extends Document {
    username:string,
    email:string,
    password:string,
    isAdmin:boolean,
    isVerified:boolean,
    verifiedToken?:string,
    verifiedTokenExpiry?:Date,
    forgotPasswordToken?:string,
    forgotPasswordTokenExpiry?:Date,
    comparePassword(enteredPassword:string):Promise<boolean>,
    generateToken():Promise<string>
}
const userSchema:Schema<IUSER> = new Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifiedToken:String,
    verifiedTokenExpiry:Date,
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date
})

userSchema.pre('save',async function(next){
    try {
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password,10);
        }
        next();
    } catch (error) {
        throw error;
    }
})

userSchema.methods.comparePassword = async function(enteredPassword:string){
    try {
        const comparedResult =  await bcrypt.compare(enteredPassword,this.password);
        if(comparedResult){
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

userSchema.methods.generateToken = async function(){
    try {
        const tokenData = {
            userID : this._id,
        }
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn:'1d'});
        return token;
    } catch (error:any) {
        throw new Error('Error while generating token',error);
    }
}

const User = models.User as Model<IUSER> || mongoose.model<IUSER>('User',userSchema);

export default User;