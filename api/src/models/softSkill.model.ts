import {
    AllowNull,
    Column,
    Model,
    Table,
} from 'sequelize-typescript';

@Table({
    timestamps: false,
})

export class SoftSkill extends Model<SoftSkill> {

    @AllowNull(false)
    @Column
    name: string

}