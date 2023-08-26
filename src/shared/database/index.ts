import { createConnection } from "typeorm";

createConnection().then(() =>{
    console.log("Conectado com o banco");
    if(!process.env.API_SECRET){
        throw Error('API SECRET not defined');
    }
}).catch(error => console.log("erro ao conectar no banco: "+error));