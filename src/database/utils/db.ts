import type { Table } from 'dexie'
import Dexie from 'dexie'

import type { Config } from '../modules/config/define'
import { config } from '../modules/config/define'

export class DexieDB extends Dexie {
  // [Get started with Dexie in Vue](https://dexie.org/docs/Tutorial/Vue)
  // added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  config!: Table<Config>

  constructor() {
    super('contez')
    this.version(1).stores({ // #check-point 修改表后，记得更新版本
      config,
    })
  }
}

export default new DexieDB()
