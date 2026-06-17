
import mongoose, { Schema, Document, Model } from "mongoose";


// userSchema es el esquema de datos para el modelo de usuario, que define los campos y sus tipos, así como las validaciones 
// y restricciones para cada campo.
const userSchema = new Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"],
  },
  password: { 
    type: String, 
    required: [true, "Password is required"],
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: [true, "Email must be unique"],
  },
  img: { 
    type: String, 
    default: ''
  },
  roles: { 
    type: [String], 
    default: ['USER_ROLE'],
    enum: ['USER_ROLE', 'ADMIN_ROLE'],
  },

}, { timestamps: true });


export const UserModel = mongoose.model('User', userSchema);