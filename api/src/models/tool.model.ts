import {
    AllowNull,
    BelongsToMany,
    Column,
    IsUrl,
    Model,
    Table,
} from 'sequelize-typescript';
import { Project } from './project.model';
import { ProjectTool } from './projectTool.model';

@Table({
    timestamps: false,
})
export class Tool extends Model<Tool> {

    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @IsUrl
    @Column
    image: string

    @AllowNull(false)
    @Column
    nivel: string

    @BelongsToMany(() => Project, () => ProjectTool)
    projects: Project[];

}