import { ForbiddenException, Injectable, Param } from '@nestjs/common';
import { GetUser } from '../decorator';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}
  getNotes(userId: number) {
    //get all notes
    const notes = this.prismaService.note.findMany({
      where: {
        userId,
      },
    });
    return notes;
  }
  getNoteById(noteId: number) {
    return this.prismaService.note.findFirst({
      where: {
        id: noteId,
      },
    });
  }
  async insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
    const note = await this.prismaService.note.create({
      data: {
        ...insertNoteDTO,
        userId,
      },
    });
    return note;
  }
  updateNoteById(noteId: number, updateNoteDTO: UpdateNoteDTO) {
    const note = this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new ForbiddenException('Cannot find Note to update');
    }
    return this.prismaService.note.update({
      where: {
        id: noteId,
      },
      data: { ...updateNoteDTO },
    });
  }
  deleteNoteById(noteId: number) {
    console.log('deleteNoteById');
    const note = this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new ForbiddenException('Cannot find Note to delete');
    }
    return this.prismaService.note.delete({
      where: {
        id: noteId,
      },
    });
  }
}
