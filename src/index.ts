import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import * as dotenv from "dotenv";
import entities from './entities/index';
import resolvers from './resolver/index';
import authchecker from "./types/authchecker";
import jwt  from "jsonwebtoken";
import Student from "./entities/student";
dotenv.config()

const main = async () => {
    const schema = await buildSchema({
        resolvers,
        authChecker : authchecker
    });
    const server = new ApolloServer({
        schema,
        context : async ({req} : {req: any}) => {
            let student;
            try{
                if (req.headers.authorization){
                    let token = req.headers.authorization;
                    console.log(token);
                    const decoded: any = jwt.verify(
                        token.split("Bearer ")[1],
                        process.env.JWT_SECRET!
                      );
                    console.log(decoded);

                    student = await Student.findOne({where : {id : decoded}});
                }
            }
            catch(e){
                console.log(e)
                throw new Error(`error ---> ${e}`);
            }
            console.log(student);
            
            return student;
            
        }
    });

    server.listen(4000, () => {
        console.log("server started on http://localhost:4000");
    });
};

createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities,
    logging: true,
}).then(() => {
    console.log('COnnected');
    main();
})