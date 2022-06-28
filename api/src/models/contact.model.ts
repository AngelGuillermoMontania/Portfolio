import {
    AllowNull,
    Column,
    IsEmail,
    IsUrl,
    Model,
    Table,
} from 'sequelize-typescript';

@Table({
    timestamps: false,
})
export class Contact extends Model<Contact> {

    @AllowNull(false)
    @IsUrl
    @Column
    linkedin: string

    @AllowNull(false)
    @Column
    mobile: number

    @AllowNull(false)
    @IsUrl
    @Column
    twitter: string

    @AllowNull(false)
    @IsUrl
    @Column
    github: string

    @AllowNull(false)
    @IsEmail
    @Column
    email: string

}