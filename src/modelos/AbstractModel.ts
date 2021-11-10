import { v4 } from 'uuid'

abstract class AbstractModel {
  constructor (public id?: string) {
    if (!id) {
      this.id = v4()
    }
  }
}

export { AbstractModel }
