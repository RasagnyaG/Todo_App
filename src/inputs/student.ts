import { Field, InputType } from "type-graphql";

@InputType("Create")
class NewStudent{
    @Field()
    name : string;

    @Field()
    email : string;

    @Field()
    password : string;
}

@InputType("Login")
class LoginInput{
    @Field()
    email : string;

    @Field()
    password : string

}

@InputType("Change")
class Change{
    @Field({nullable: true})
    name : string;

    @Field({nullable: true})
    email : string;

    @Field({nullable: true})
    password : string;
}

export {NewStudent, LoginInput, Change}