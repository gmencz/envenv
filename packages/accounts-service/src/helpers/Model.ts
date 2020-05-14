import { BaseEntity } from 'typeorm';

/* 
  Custom Entity so we can extend it instead of BaseEntity
  for all our other entities and call new with a custom constructor
*/
export class Model extends BaseEntity {
  constructor(fields?: object) {
    super();
    if (fields) this.setFields(fields);
  }

  setFields(fields: object) {
    for (const [key, value] of Object.entries(fields)) {
      this[key] = value;
    }
  }
}
