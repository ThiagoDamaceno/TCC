import { v4 as uuidv4 } from 'uuid'

abstract class AbstractModel {
  constructor (public id?: string) {
    if (!id) {
      this.id = uuidv4()
    }
  }
}

export { AbstractModel }
