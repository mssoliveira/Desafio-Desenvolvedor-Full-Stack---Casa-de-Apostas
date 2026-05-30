import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('Clientes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({ version: '1', path: 'clientes' })
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar clientes' })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Buscar cliente por ID' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiResponse({ status: 200, description: 'Detalhes do cliente' })
  @ApiResponse({ status: 400, description: 'Cliente não encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.clientsService.findOne(id);
  }

  @Post('')
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar novo cliente' })
  @ApiBody({
    type: CreateClientDto,
    examples: {
      body: {
        summary: 'Criar cliente',
        value: {
          name: 'Usuário Teste',
          email: 'teste@cadastro.com',
          phone: '5575998239367',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Cliente Criado',
  })
  @ApiResponse({ status: 400 })
  async create(@Body() body: CreateClientDto) {
    return await this.clientsService.create(body);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar cliente' })
  @ApiParam({
    name: 'id',
    example: '0864bc76-af3a-4154-8bdc-729b7a9d0235',
  })
  @ApiBody({
    type: UpdateClientDto,
    examples: {
      body: {
        summary: 'Atualizar cliente',
        value: {
          name: 'Usuário Atualizado',
          email: 'novoemail@cadastro.com',
          phone: '5575999999999',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  async update(@Param('id') id: string, @Body() body: UpdateClientDto) {
    return this.clientsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Excluir cliente por ID' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiResponse({ status: 200, description: 'Cliente Excluido' })
  @ApiResponse({ status: 400, description: 'Cliente não encontrado' })
  async remove(@Param('id') id: string) {
    return await this.clientsService.remove(id);
  }
}
