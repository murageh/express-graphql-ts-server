import { DataSource } from "typeorm"
import dataSource from "./ormconfig.json"

export const myDataSource = new DataSource(dataSource as any)