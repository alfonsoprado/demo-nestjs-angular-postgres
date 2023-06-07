import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "./decorators/public.decorator";

// Healthcheck: For kubernetes or docker :)
@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Public endpoint, no authentication required.' }) 
  HealthCheck() {
    return {
      status: 'OK',
    };
  }
}