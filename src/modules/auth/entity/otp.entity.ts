import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'otps' })
export class OTP {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  code: string;
  @Column()
  expires_in: Date;
  @Column({ default: false })
  used: boolean;
  @Column()
  user_id: number;
  @OneToOne(() => User, user => user.otp)
  user: User;
  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;
  @UpdateDateColumn({ type: 'time with time zone' })
  updated_at: Date;
}
