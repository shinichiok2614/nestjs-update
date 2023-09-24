import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MyJWTGuard } from '../guard';
import { NoteService } from './note.service';
import { GetUser } from '../decorator';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
import { User } from '@prisma/client';

@UseGuards(MyJWTGuard)
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}
  @Get()
  getNotes(@GetUser('id') userId: number) {
    return this.noteService.getNotes(userId);
  }
  @Get(':id')
  getNoteById(@Param('id', ParseIntPipe) noteId: number) {
    return this.noteService.getNoteById(noteId);
  }
  @Post()
  insertNote(
    @GetUser('sub') userId: number,
    // @GetUser() user: User,
    @Body() insertNoteDTO: InsertNoteDTO,
  ) {
    console.log('insertNote');
    console.log(
      `userId: ${userId}, insertNoteDTO: ${JSON.stringify(insertNoteDTO)}`,
      // user,
    );
    return this.noteService.insertNote(userId, insertNoteDTO);
  }
  @Patch(':id')
  updateNotesById(
    @Param('id', ParseIntPipe) noteId: number,
    @Body() updateNoteDTO: UpdateNoteDTO,
  ) {
    return this.noteService.updateNoteById(noteId, updateNoteDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteNoteById(@Query('id', ParseIntPipe) noteId: number) {
    console.log('noteId');
    console.log(noteId);
    // return this.deleteNotebyId(noteId);
    return this.noteService.deleteNoteById(noteId);
  }
}
