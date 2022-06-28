import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Project } from './project.model';

@Table({
  timestamps: false,
})
export class Image extends Model<Image> {

  @AllowNull(false)
  @Column
  url: string;
  
  @AllowNull(false)
  @Column
  order: number
  
  @ForeignKey(() => Project)
  @AllowNull(false)
  @Column
  projectId: number;


  @BelongsTo(() => Project)
  project: Project;
}
