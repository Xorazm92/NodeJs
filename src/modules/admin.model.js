import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    admin_name: {
        type: String,
        required: true,
        trim: true,
      },
      admin_email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,,
          "Please enter the correct email address!",
        ],
      },
      admin_phone: {
        type: String,
        unique: true,
        validate: {
          validator: function (value) {
              return /^\d{2}-\d{3}-\d{2}-\d{2}$/.test(value);
          },
          message: (props) => `${props.value}-Enter the correct phone number!`,
        },
      },
      admin_password: {
        type: String,
        required: true,
        minlength: [6,'The password is ...too short'],
      },
      admin_is_active: {
        type: Boolean,
        default: true,
      },
      admin_is_creater: {
          type: Boolean,
          default: false,
      },
      created_date: {
          type: Date,
          default: Date.now,
      },
      updated_date: {
          type: Date,
      },
      token: {
        type: String,
        default: null,
      },
      activation_link:{
        type: String,
        default: null,
      } 
    },
    {
      versionKey: false,
    }
  );
  
  module.exports = model("Admin", adminSchema);
