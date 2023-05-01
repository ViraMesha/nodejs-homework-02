const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegex = /^[A-Za-z0-9_!#$%&'*+ /=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { type: String, default: "" },
    avatarURL: String,
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

module.exports = { User, authSchema };
