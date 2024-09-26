const express = require('express');
const createHttpError = require('http-errors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const connectFlash = require('connect-flash');
const passport = require('passport');
const connectMongo = require('connect-mongo');
const { ensureLoggedIn } = require('connect-ensure-login');
const { roles } = require('./utils/constants');
var path = require('path');
var cookieParser = require('cookie-parser');

// Initialization
const app = express();
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const MongoStore = connectMongo(session);
// Init Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true,
      httpOnly: true,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// For Passport JS Authentication
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport.auth');

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Connect Flash
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Routes
app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'));

app.use('/admin',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureAdmin,
  require('./routes/admin.route')
);
// ****** student ******** // 
app.use('/course',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/course/course.route')
);

/** project */
app.use('/project',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/project/project.route')
);
app.use('/project-Ticket_Booking_System',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/project/1_TicketBookingSystem.route')
);
app.use('/project-Point_of_Sales_System',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/project/2_PointofSalesSystem.route')
);
app.use('/project-Project_QUIZ3',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/project/3_ProjectQUIZ3.route')
);

//** course **//
app.use('/course-Algorithms_and_Flowcharts',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/course/1_Algorithms_and_Flowcharts-course.route')
);
app.use('/course-Datatype_and_Variable',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/course/2_Datatype_and_Variable-course.route')
);
app.use('/course-Input_and_Output',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/course/3_Input_and_Output-course.route')
);
app.use('/course-Operators_and_Expressions',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/course/4_Operators_and_Expressions-course.route')
);
app.use('/course-Selection_Statements',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/course/5_Selection_Statements-course.route')
);
app.use('/course-Loop_Statements',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/course/6_Loop_Statements-course.route')
);
app.use('/course-Arrays_and_Strings',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/course/7_Arrays_and_Strings-course.route')
);
app.use('/course-Functions',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/course/8_Functions-course.route')
);

//** Quiz **//
app.use('/course-Algorithms_and_Flowcharts-quiz',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/quiz/1_Algorithms_and_Flowcharts-quiz.route')
);
app.use('/course-Datatype_and_Variable-quiz',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/quiz/2_Datatype_and_Variable-quiz.route')
);
app.use('/course-Input_and_Output-quiz',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/quiz/3_Input_and_Output-quiz.route')
);
app.use('/course-Operators_and_Expressions-quiz',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/quiz/4_Operators_and_Expressions-quiz.route')
);
app.use('/course-Selection_Statements-quiz',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/quiz/5_Selection_Statements-quiz.route')
);
app.use('/course-Loop_Statements-quiz',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/quiz/6_Loop_Statements-quiz.route')
);//** **/
app.use('/course-Arrays_and_Strings-quiz',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/quiz/7_Arrays_and_Strings-quiz.route')
);
app.use('/course-Functions-quiz',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/quiz/8_Functions-quiz.route')
);

//** Pretest **//
app.use('/course-Algorithms_and_Flowcharts-pretest',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest/1_Algorithms_and_Flowcharts-pretest.route')
);
app.use('/course-Datatype_and_Variable-pretest',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest/2_Datatype_and_Variable-pretest.route')
);
app.use('/course-Input_and_Output-pretest',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest/3_Input_and_Output-pretest.route')
);
app.use('/course-Operators_and_Expressions-pretest',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest/4_Operators_and_Expressions-pretest.route')
);
app.use('/course-Selection_Statements-pretest',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest/5_Selection_Statements-pretest.route')
);
app.use('/course-Loop_Statements-pretest',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest/6_Loop_Statements-pretest.route')
);
app.use('/course-Arrays_and_Strings-pretest',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest/7_Arrays_and_Strings-pretest.route')
);
app.use('/course-Functions-pretest',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest/8_Functions-pretest.route')
);

//** pretest check **//
app.use('/pretest1_check',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest_check/pretest1_check.route')
);
app.use('/pretest2_check',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest_check/pretest2_check.route')
);
app.use('/pretest3_check',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest_check/pretest3_check.route')
);
app.use('/pretest4_check',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest_check/pretest4_check.route')
);
app.use('/pretest5_check',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest_check/pretest5_check.route')
);
app.use('/pretest6_check',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest_check/pretest6_check.route')
);
app.use('/pretest7_check',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest_check/pretest7_check.route')
);
app.use('/pretest8_check',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/pretest_check/pretest8_check.route')
);



app.use('/question',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureStudent,
  require('./routes/student/question.route')
);



// ****** teacher ******** // 
app.use('/class',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureTeacher,
  require('./routes/teacher/class.route')
);
app.use('/check',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureTeacher,
  require('./routes/teacher/check.route')
);
app.use('/answer',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureTeacher,
  require('./routes/teacher/answer.route')
);
app.use('/classStudent',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureTeacher,
  require('./routes/teacher/classStudent.route')
);
// *************** // 

// 404 Handler
app.get('/error', (req, res) => {
  const error = {
      status: 404,
      message: 'Page not found'
  };
  res.render('error_40x', { error });
});

// Setting the PORT
const PORT = process.env.PORT || 3000;

// Making a connection to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('💾 connected...');
    // Listening for connections on the defined PORT
    app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err.message));

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect('/auth/login');
//   }
// }

function ensureAdmin(req, res, next) {
  if (req.user.role === roles.admin) {
    next();
  } else {
    req.flash('warning', 'you are not Authorized to see this route');
    res.redirect('/');
  }
}


function ensureTeacher(req, res, next) {
  if (req.user.role === roles.teacher) {
    next();
  } else {
    req.flash('warning', 'you are not Authorized to see this route');
    res.redirect('/');
  }
}function ensureStudent(req, res, next) {
  if (req.user.role === roles.student) {
    next();
  } else {
    req.flash('warning', 'you are not Authorized to see this route');
    res.redirect('/');
  }
}
