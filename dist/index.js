"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const user_1 = __importDefault(require("./routes/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = new server_1.default();
//Middleware
//Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Rutas de la App
server.app.use('/user', user_1.default);
//Conectar DB
mongoose_1.default.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if (err)
        throw err;
    console.log('BaseData Online');
});
//Levantar Express
server.start(() => {
    console.log(`Server Running in Port ${server.port}`);
});
