import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { Fields, StandardDeleteResponse, UserId } from 'warthog';

import {
  NotesCreateInput,
  NotesCreateManyArgs,
  NotesUpdateArgs,
  NotesWhereArgs,
  NotesWhereInput,
  NotesWhereUniqueInput
} from '../../../generated';

import { Notes } from './notes.model';
import { NotesService } from './notes.service';

@Resolver(Notes)
export class NotesResolver {
  constructor(@Inject('NotesService') public readonly service: NotesService) {}

  @Query(() => [Notes])
  async notess(
    @Args() { where, orderBy, limit, offset }: NotesWhereArgs,
    @Fields() fields: string[]
  ): Promise<Notes[]> {
    return this.service.find<NotesWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => Notes)
  async notes(@Arg('where') where: NotesWhereUniqueInput): Promise<Notes> {
    return this.service.findOne<NotesWhereUniqueInput>(where);
  }

  @Mutation(() => Notes)
  async createNotes(@Arg('data') data: NotesCreateInput, @UserId() userId: string): Promise<Notes> {
    return this.service.create(data, userId);
  }

  @Mutation(() => [Notes])
  async createManyNotess(
    @Args() { data }: NotesCreateManyArgs,
    @UserId() userId: string
  ): Promise<Notes[]> {
    return this.service.createMany(data, userId);
  }

  @Mutation(() => Notes)
  async updateNotes(
    @Args() { data, where }: NotesUpdateArgs,
    @UserId() userId: string
  ): Promise<Notes> {
    return this.service.update(data, where, userId);
  }

  @Mutation(() => StandardDeleteResponse)
  async deleteNotes(
    @Arg('where') where: NotesWhereUniqueInput,
    @UserId() userId: string
  ): Promise<StandardDeleteResponse> {
    return this.service.delete(where, userId);
  }
}
