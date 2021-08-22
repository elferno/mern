// imports
import mongoose from "mongoose";

// var
const {Schema, model} = mongoose;

// create user DB data scheme
const schema = new Schema({
	login: {type: String, required: true, unique: true},
	pass : {type: String, required: true},
	links: [{type: Schema.Types.ObjectId, ref: 'Link'}]
})

export default model('User', schema)