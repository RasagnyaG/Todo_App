import { Mutation, Query, Resolver, Arg, Authorized, Ctx } from "type-graphql";
import Student from "../entities/student";
import { Change, LoginInput, NewStudent } from "../inputs/student";
import LoginOutput from "../types/LoginOutput";
import bcryptjs from "bcryptjs";
import jwt  from "jsonwebtoken";
import MyContext from "../types/context";

@Resolver()
class StudentResolver {
    @Query(() => String)
    async hello() {
        return 'hello world'
    }

    @Mutation(() => Student)
    async createNewStudent(@Arg("New") studentInfo : NewStudent) {
        try{
            const student = await Student.create({
                name : studentInfo.name,
                email : studentInfo.email,
                password : bcryptjs.hashSync(studentInfo.password)
            }).save();

            return student
        }
        catch(e){
            throw new Error(`error ---> ${e}`);
        }
    }

    @Mutation(() => LoginOutput)
    async login(@Arg("Login") {email, password} : LoginInput) {
        try{
            const student = await Student.findOne({where : {email : email}});
            if (!student) throw new Error("Invalid Email");
            const passwordIsValid = bcryptjs.compareSync(password, student.password);
            if (!passwordIsValid) throw new Error("Invalid Password");
            let token = jwt.sign(student.id, process.env.JWT_SECRET!);

            return {
                token : token,
                status : true
            };
        }
        catch(err){
            throw new Error(`error ---> ${err}`);
        }
    }

    @Mutation(() => Student)
    @Authorized()
    async update (@Ctx() {student} : MyContext, @Arg("Changes") updatedInfo : Change){
        try{
            if (updatedInfo.email) student.email = updatedInfo.email;
            if (updatedInfo.name) student.name = updatedInfo.name;
            if (updatedInfo.password) student.password = bcryptjs.hashSync(updatedInfo.password);

            let newStudent = await student.save();

            return newStudent;
        }
        catch(e){
            throw new Error(`error ---> ${e}`);
        }
    }
}

export default StudentResolver;
