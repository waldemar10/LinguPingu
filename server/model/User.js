const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
bcrypt = require("bcrypt");
SALT_WORK_FACTOR = 10;

const ProgressSchema = new Schema({
  grammar: {
    type: Schema.Types.ObjectId,
    ref: "Grammar",
    default: null,
  },
  lessons: [
    {
      lessonId: {
        type: Schema.Types.ObjectId,
        ref: "Grammar.lessons",
        default: null,
      },
      tasks: [
        {
          taskId: {
            type: Schema.Types.ObjectId,
            default: null,
          },
          completed: {
            type: Boolean,
            default: false,
          },
        },
      ],
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  verificationToken: {
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  token:{
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "",
    required: false,
  },
  nativeLanguage: {
    type: Array,
    of: String,
    default: [],
    required: false,
  },
  learningLanguages: {
    type: Array,
    of: String,
    default: [],
    required: false,
  },
  biography: {
    type: String,
    default:
      "Leer wie eine leere Leinwand. Deine Biographie wartet darauf, geschrieben zu werden. Leg los!",
    required: false,
  },
  profilePicture32: {
    type: String,
    default:
      "https://res.cloudinary.com/drfeiriuk/image/upload/f_auto,q_auto/v1/LinguPingu/ProfilePictures/000/32",
    required: false,
  },
  profilePicture64: {
    type: String,
    default:
      "https://res.cloudinary.com/drfeiriuk/image/upload/f_auto,q_auto/v1/LinguPingu/ProfilePictures/000/64",
    required: false,
  },
  profilePicture128: {
    type: String,
    default:
      "https://res.cloudinary.com/drfeiriuk/image/upload/f_auto,q_auto/v1/LinguPingu/ProfilePictures/000/128",
    required: false,
  },
  profilePicture256: {
    type: String,
    default:
      "https://res.cloudinary.com/drfeiriuk/image/upload/f_auto,q_auto/v1/LinguPingu/ProfilePictures/000/256",
    required: false,
  },
  profilePicture512: {
    type: String,
    default:
      "https://res.cloudinary.com/drfeiriuk/image/upload/f_auto,q_auto/v1/LinguPingu/ProfilePictures/000/512",
    required: false,
  },
  progressGrammar: {
    type: ProgressSchema,
    default: {
      grammar: null,
      lessons: [
        {
          lessonId: null,
          tasks: [
            {
              taskId: null,
              completed: false,
            },
          ],
          completed: false,
        },
      ],
    },
  },
});

/**
 * @source: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
 */
UserSchema.pre("save", function (next) {
  var user = this;

  //only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  //generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    //hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      //override the cleartext password with the hashed one
      user.password = hash;

      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (error, isMatch) {
    if (error) return cb(error);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
