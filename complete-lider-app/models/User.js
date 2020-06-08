const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const bcrypt = require('bcrypt');

const UserSchema = new Schema ({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['operator', 'administrator'],
        required:true
    },
    todos: [{type : mongoose.Schema.Types.ObjectId, ref: 'Todo'}],
    branchoffice: {type: String, required: true},
    timestamp: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err)
            return next(err);
            this.password = passwordHash;
            next();
    });
});

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)
            return cb(err);
        else {
            if(!isMatch)
                return cb(null, isMatch);
            return cb(null, this);
        }    
    });
};

module.exports = model('User', UserSchema);