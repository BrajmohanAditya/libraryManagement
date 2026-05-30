import { Library } from "src/librarys/entities/library.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

export type PlanType = 'HOURS' | 'DAYS' | 'MONTH';

@Entity('library_prices')
export class LibraryPrice {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  planName!: string; 

  @Column({
    type: 'enum',
    enum: ['HOURS', 'DAYS', 'MONTH'],
  })
  type!: PlanType;

  @Column()
  durationValue!: number; 

  @Column()
  libraryId!: string;


  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price!: number;

  @ManyToOne(() => Library, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'libraryId' })
  library!: Library;
}