import { BaseModel, IntField, Model, StringField } from 'warthog';

@Model()
export class Notes extends BaseModel {
  @IntField()
  characterID!: number;

  @StringField({ nullable: true })
  contents?: string;
}
