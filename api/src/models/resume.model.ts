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
export class Resume extends Model<Resume> {

    @AllowNull(false)
    @IsUrl
    @Column
    spanish: string

    @AllowNull(false)
    @IsUrl
    @Column
    english: string

}