import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

console.log(process.env.MYSQL_USER);