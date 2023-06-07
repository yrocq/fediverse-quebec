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
      title, instances.domain_name, short_description, description, user_count, status_count, registrations, updated_at
      FROM instances INNER JOIN tags ON instances."domain_name" = tags.domain_name WHERE tags.tag = 'quebec';`;
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

  public getStatistics(): Promise<any> {
    return Promise.all([
      this.getInstanceStatistics(),
      this.getQuebecStatistics(),
    ]).then((values) => {
      return values.reduce((acc, value) => {
        return {
          ...acc,
          ...value,
        };
      });
    });
  }

  async getInstanceStatistics(): Promise<any> {
    return this.database
      .query(
        `SELECT
      COUNT(*) AS instances,
      SUM(user_count) AS users,
      SUM(status_count) AS statuses
      FROM instances;`
      )
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getQuebecStatistics(): Promise<any> {
    return this.database
      .query(
        `SELECT count(*) AS quebec_instances, SUM(user_count) AS quebec_users, SUM(status_count) AS quebec_statuses FROM instances INNER JOIN tags ON instances."domain_name" = tags.domain_name WHERE tags.tag = 'quebec';`
      )
      .then((result) => {
        return result.rows[0];
      });
  }
}
