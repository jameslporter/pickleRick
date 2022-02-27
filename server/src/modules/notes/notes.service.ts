import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseService } from 'warthog';

import { Notes } from './notes.model';

@Service('NotesService')
export class NotesService extends BaseService<Notes> {
  constructor(@InjectRepository(Notes) protected readonly repository: Repository<Notes>) {
    super(Notes, repository);
  }
}
