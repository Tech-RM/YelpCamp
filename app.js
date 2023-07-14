import express from 'express';
import ejsMate from 'ejs-mate';
import  methodOverride  from 'method-override';
import path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import localStrategy from 'passport-local';


//***In ES modules, you can use the import.meta.url
// property to get the URL of the current module file.
// You can then manipulate this URL to extract the directory path */
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ExpressError from './utility/Express/expressError.js';
import campRouter from './routes/campground.route.js';
import reviewRouter from './routes/review.route.js';
import userRouter from './routes/user.route.js';
import User from './utility/mongoose/model/user.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//****END ******/


const app=express();

// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'components'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig={
    secret:"Thisismyrealsecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires: Date.now() + 1000*60*60*24,
        maxAge: 1000*60*60*24,
    }
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(flash());
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})

app.use("/user",userRouter);
app.use("/campground",campRouter);
app.use("/campground/:id/reviews",reviewRouter);

app.get('/',(req,res)=>{
    res.render('home');
})

app.all('/*',(req,res,next)=>{
    next(new ExpressError("Page not found",404));
})

app.use((err,req,res,next)=>{
    const {statusCode=500,message="You encountered an error from custom function",stack}=err;
    res.status(statusCode).render("errorPage",{message,stack});
})

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`App is running on PORT ${PORT}.`);
})