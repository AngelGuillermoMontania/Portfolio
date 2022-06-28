import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Project } from './project.model';
import { Tool } from './tool.model';

@Table({
    timestamps: false,
  })

export class ProjectTool extends Model<ProjectTool> {
  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @ForeignKey(() => Tool)
  @Column
  toolId: number;
}
