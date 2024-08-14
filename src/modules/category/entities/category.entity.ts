import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  title: string;
  @Column({ unique: true })
  slug: string;
  @Column()
  image: string;
  @Column()
  show: boolean;
  @Column({ nullable: true })
  parentId: number;
  @ManyToOne(() => Category, (category) => category.children, {
    onDelete: 'CASCADE',
  })
  parent: Category;
  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}
