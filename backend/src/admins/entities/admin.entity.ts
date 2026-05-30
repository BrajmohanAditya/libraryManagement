import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Library } from "src/librarys/entities/library.entity";

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    name!: string
    @Column()
    email!: string
    @Column()
    password!: string

    @Column({nullable: true})
    number!: string

    @Column({nullable : true})
    image!: string

    @OneToMany(() => Library, (library) => library.admin)
    libraries!: Library[];

}
