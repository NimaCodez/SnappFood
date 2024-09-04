import { Injectable } from '@nestjs/common';
import { configDotenv } from 'dotenv';
import { join } from 'path';
import { Resend } from 'resend';
configDotenv({ path: join(process.cwd(), '.env') });

@Injectable()
export class EmailService {

    private readonly resend: Resend;
    constructor() {
        let resendService = new Resend(process.env.RESEND_API_KEY);
        this.resend = resendService;
    }
	SendOTPEmail(code: string) {}
}
