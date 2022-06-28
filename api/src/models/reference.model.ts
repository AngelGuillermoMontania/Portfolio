import {
    AllowNull,
    Column,
    IsUrl,
    Model,
    Table,
} from 'sequelize-typescript';

@Table({
    timestamps: false,
})
export class Reference extends Model<Reference> {

    @AllowNull(false)
    @IsUrl
    @Column
    link: string

    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    message: string

    @AllowNull(false)
    @IsUrl
    @Column
    image: string

}