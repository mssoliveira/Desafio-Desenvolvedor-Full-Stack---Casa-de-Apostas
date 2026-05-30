import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({ version: '1', path: 'dashboard' })
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('count')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar clientes e Contatos na Base' })
  findAll() {
    return this.dashboardService.findCountAll();
  }
}
