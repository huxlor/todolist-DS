import Server from "./classes/server";
import userRoutes from "./routes/user";
import mongoose from "mongoose";
import bodyParser from 'body-parser';

const server = new Server();
//Middleware
//Body Parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());
// Rutas de la App
server.app.use('/user', userRoutes);

//Conectar DB
mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log('BaseData Online');
});

//Levantar Express
server.start(() => {
    console.log(`Server Running in Port ${ server.port }`);
});