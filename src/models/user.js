import Model from './model';

import { TABLE } from '../constants';

const TABLE_NAME = TABLE.users;
const COLUMN_TYPES = {
  id: 'number',
  firstname: 'string',
  lastname: 'string',
  email: 'string',
  password: 'string',
  created_at: 'string',
  updated_at: 'string'
};

/**
 * User model.
 */
class User extends Model {
  constructor() {
    super(TABLE_NAME, COLUMN_TYPES);
  }

  /**
   * Get table name.
   * @returns {string}
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Fetches all the users
   */
  all = () => {
    const sql = `
    SELECT u.*
    FROM ${TABLE.users} u
    `;

    return this.queryDatabase(sql);
  };


  /**
   * Fetch contacts of a particular user
   * @param {number} id User id
   * @returns {Promise}
   */
  getContacts = (id) => {
    const sql = `
    SELECT p.*
    FROM ${TABLE.users} u
    JOIN ${TABLE.contacts} p
      ON p.user_id = u.id
    WHERE u.id=${id};
  `;

    return this.queryDatabase(sql);
  };

  /**
   * Get total users count
   * @returns {Promise}
   */
  getTotalUsersCount = () => {
    const sql = `
    SELECT count(u.id)
    FROM ${TABLE.users} u;
    `;

    return this.queryDatabase(sql);
  };
}

export default User;