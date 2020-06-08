const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require ('./models/User');

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}


//----------------AUTORIZACION---------------
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "NoobCoder"
}, (payload, done) => {
    User.findById({_id : payload.sub}, (err, user) =>{
        if(err)
            return done (err, false);
        if(user)
            return done (null, user);
        else
            return done (null, false);
    });
}));


//-------------AUTENTICACION----------------------
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username}, (err, user)=> {

        //Si hay problemas con la conexion a la db
        if(err)
            return done(err);

        //si no existe el usuario
        if(!user)
            return done(null, false);

        //verifica que la contrasena sea correcta
        user.comparePassword(password, done);
    });
}));