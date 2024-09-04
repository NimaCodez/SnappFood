import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAddress } from './address.entity';
import { OTP } from 'src/modules/auth/entity/otp.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ nullable: true })
  first_name: string;
  @Column({ nullable: true })
  last_name: string;
  @Column({ unique: true })
  mobile: string;
  @Column({ nullable: true, unique: true })
  email: string;
  @Column({ unique: true, nullable: true })
  invite_code: string;
  @Column({ default: 0 })
  score: number;
  @Column({ nullable: true })
  agent_id: number;
  // @OneToMany(() => UserAddress, userAddr => userAddr.user, { nullable: true })
  // user_addresses: UserAddress[];
  
  @Column({ nullable: true })
  otp_id: number;
  @OneToOne(() => OTP, otp => otp.user)
  @JoinColumn()
  otp: OTP;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;
  @UpdateDateColumn({ type: 'time with time zone' })
  updated_at: Date;
}
