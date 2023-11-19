import type { Table } from 'dexie'
import db from '../../utils/db'
import BaseModel from './../../utils/baseModel'
import type { Config } from './index'

class ConfigModel extends BaseModel {
  public currentTable: Table<Config>

  constructor() {
    super(db.config)
    this.currentTable = db.config
  }
}

export default new ConfigModel()
