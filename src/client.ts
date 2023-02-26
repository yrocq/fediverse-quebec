import { Client as PgClient } from "pg";
import { format } from "date-fns";
import { Instance } from "./models/instance";

export default class Client {
  database: PgClient;

  constructor() {
    this.database = new PgClient(process.env.DATABASE_URL);
  }
  public async fetchAllInstances(): Promise<Instance[]> {
    await this.database.connect();
    const query = `SELECT
      title, domain_name, short_description, description, user_count, status_count, registrations, updated_at
      FROM instances WHERE domain_name like '%quebec%' OR title LIKE '%Qu_b_c%' OR short_description LIKE '%Qu_b_c%' OR description LIKE '%Qu_bec%' OR title LIKE '%Montr_eal%' OR short_description LIKE '%Montr_eal%' OR description LIKE '%Montr_eal%'  ORDER BY user_count DESC;`;
    const result = await this.database.query(query);
    const instances = result.rows.map((row) => {
      return {
        ...row,
        ...{
          updated_at: row.updated_at
            ? format(row.updated_at, `dd/MM/yyyy HH'h'mm`)
            : null,
        },
      };
    });

    return instances;
  }

  public async fetchInstanceByDomain(domain: string): Promise<Instance> {
    await this.database.connect();
    const query = `SELECT title, domain_name, short_description, description, user_count, status_count, registrations, updated_at, created_at
    FROM instances WHERE domain_name=$1`;
    const result = await this.database.query(query, [domain]);
    const instance = result.rows[0];
    return {
      ...instance,
      ...{
        updated_at: instance.updated_at
          ? format(instance.updated_at, `dd/MM/yyyy HH'h'mm`)
          : null,
      },
      ...{ created_at: format(instance.created_at, `dd/MM/yyyy HH'h'mm`) },
    };
  }
}
