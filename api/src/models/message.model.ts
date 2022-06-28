import {
    AllowNull,
    Column,
    IsEmail,
    Model,
    Table,
} from 'sequelize-typescript';

@Table({
    timestamps: false,
})
export class Message extends Model<Message> {

    @AllowNull(false)
    @Column
    title: string

    @AllowNull(false)
    @Column
    body: string

    @AllowNull(false)
    @IsEmail
    @Column
    email: string

}