import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Project } from './project.model';
import { Skill } from './skill.model';

@Table({
    timestamps: false,
  })

export class ProjectSkill extends Model<ProjectSkill> {
  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @ForeignKey(() => Skill)
  @Column
  skillId: number;
}
