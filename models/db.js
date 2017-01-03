const chalk = require('chalk');
const mongoose = require( 'mongoose' );
const Schema = require('mongoose').Schema;
const bcrypt=require('bcrypt');
const SALT_WORK_FACTOR = 10;

const dbURI = 'mongodb://localhost:27017/bugtracking';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});
mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});
mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});

var userSchema = new mongoose.Schema({
  username: {type: String, unique:true},
  email: {type: String, unique:true},
  password: String,
  type: String
});

userSchema.pre('save', function(next) {
    var user = this;
    debugger;
    console.log("Before Registering the user");
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        console.log("Salt");
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            console.log("Hash : "+hash);
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Build the User model
mongoose.model( 'User', userSchema,'Users' );

// Projects Schema
var projectsSchema = new mongoose.Schema({
  title: {type: String,unique:true},
  created_at:{type:Date,default:Date.now},
  description:String,
  manager: {type: Schema.Types.ObjectId, ref: 'User' }
});

// Build the Projects model
mongoose.model( 'Project', projectsSchema,'Projects');

// Projects Schema
var bugsSchema = new mongoose.Schema({
  description: {type: String},
  created_at:{type:Date,default:Date.now},
  created_by: {type: Schema.Types.ObjectId, ref: 'User' },
  assigned_to: {type: Schema.Types.ObjectId, ref: 'User' },
  project: {type: Schema.Types.ObjectId, ref: 'Project' },
  comments:[{body:String,commented_by:String,date:Date}],
  status: String
});

// Build the Projects model
mongoose.model( 'Bug', projectsSchema,'Bugs');
