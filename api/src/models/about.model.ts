import {
    AllowNull,
    Column,
    Model,
    Table,
} from 'sequelize-typescript';

@Table({
    timestamps: false,
})

export class About extends Model<About> {

    @AllowNull(false)
    @Column
    title: string

    @AllowNull(false)
    @Column
    description: string

    @AllowNull(false)
    @Column
    location: string

}