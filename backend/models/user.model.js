import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{
        type: 'string',
        required: 'true',
    },
    email:{
        type: String,
        required:true,
        uniquie:true,
    },
    password:{
        type:String,
        recquired: true,
        select:false
    }
})


const User = mongoose.model("User", userSchema);
export default User ;