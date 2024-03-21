
    import dotenv from "dotenv";
dotenv.config();

import { db } from "../firebase.js";

  export const registro = async (req, res) => {

    console.log('Empezando Compra');

    
 console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);  
    res.send("empezando")
   

    
  };