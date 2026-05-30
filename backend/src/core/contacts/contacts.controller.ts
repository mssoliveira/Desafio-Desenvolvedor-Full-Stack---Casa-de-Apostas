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
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('Contatos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({ version: '1', path: 'contatos' })
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todos os contatos' })
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Buscar contato por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do contato',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalhes do contato',
  })
  @ApiResponse({
    status: 400,
    description: 'Contato não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar novo contato' })
  @ApiBody({
    description: 'Dados para criação de um contato',
    type: CreateContactDto,
    examples: {
      contato: {
        summary: 'Exemplo de contato',
        value: {
          name: 'Maria Souza',
          email: 'maria@gmail.com',
          phone: '557599999999',
          clientId: '0864bc76-af3a-4154-8bdc-729b7a9d0235',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Contato criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  create(@Body() body: CreateContactDto) {
    return this.contactsService.create(body);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar contato' })
  @ApiParam({
    name: 'id',
    example: '0864bc76-af3a-4154-8bdc-729b7a9d0235',
  })
  @ApiBody({
    type: UpdateContactDto,
    examples: {
      body: {
        summary: 'Atualizar contato',
        value: {
          name: 'Maria Souza Atualizada',
          email: 'novoemail@gmail.com',
          phone: '557599999999',
          clientId: '0864bc76-af3a-4154-8bdc-729b7a9d0235',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Contato atualizado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  update(@Param('id') id: string, @Body() body: UpdateContactDto) {
    return this.contactsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Excluir contato por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do contato',
  })
  @ApiResponse({
    status: 200,
    description: 'Contato excluído com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Contato não encontrado',
  })
  remove(@Param('id') id: string) {
    return this.contactsService.delete(id);
  }
}
