const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middileware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const  express= require('express');
const app = express();
const { urlencoded } = require('express');
app.use(express.json()); 
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/',home);
app.set ( 'view engine', 'pug'); // Templating Engine
app.set('views', './views') // Templatinng Engine
// configuration
// console.log("Application Name:" + config.get('name'));
// console.log("Mail Server :" + config.get('mail.host'));
 console.log("Mail Password :" + config.get('mail.password'));
if(app.get('env') === 'development')
{
    app.use(morgan('tiny'));
    startupDebugger ('Morgan is enabled')
   }
// data base
   dbDebugger("connectinng to data base");
console.log(app.get('env'))
app.use(logger);
const port= process.env.PORT || 3001;
app.listen(port, () => { console.log(`Port is listening ${port}`)});