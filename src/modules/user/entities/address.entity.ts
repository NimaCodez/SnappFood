import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_addresses' })
export class UserAddress {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  title: string;
  @Column()
  province: string;
  @Column()
  city: string;
  @Column()
  address: string;
  @Column({ nullable: true })
  postal_code: string;
  @Column()
  userId: number;
  // @ManyToOne(() => User, user => user.user_addresses, {onDelete: 'CASCADE'})
  // user: User;
  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;
  @UpdateDateColumn({ type: 'time with time zone' })
  updated_at: Date;
}
