import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Student") //We've amde a table called students
@ObjectType("Student") //We've said that it stores obj students
class Student extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  password: string;

  @Column({ type: Boolean, default: false })
  @Field((_type) => Boolean)
  isHidden: boolean;
}

export default Student;
