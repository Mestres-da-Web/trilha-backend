import { createConnection } from "typeorm";

createConnection().then(() =>{
    console.log("Conectado com o banco")
}).catch(error => console.log("erro ao conectar np banco: "+error));