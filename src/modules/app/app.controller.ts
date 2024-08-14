import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller('/')
@ApiTags('index')
export class AppController {
    @Get()
    home() {
        return 'hello world'
    }
}