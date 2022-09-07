import { AuthChecker } from "type-graphql";
import MyContext from "./context";

const authchecker : AuthChecker<MyContext> = async ({context : {student}}) => {
    if (!student) return false;
    return true
}

export default authchecker