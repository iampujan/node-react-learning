import Model from './model';

import { TABLE } from '../constants';

const TABLE_NAME = TABLE.contacts;
const COLUMN_TYPES = {
    id: 'number',
    name: 'string',
    photograph: 'string',
    phone: 'string',
    user_id: 'number',
    created_at: 'string',
    updated_at: 'string'
};

/**
 * contact model.
 */
class Contact extends Model {
    constructor() {
        super(TABLE_NAME, COLUMN_TYPES);
    }

    /**
     * Get table name.
     */
    get tableName() {
        return TABLE_NAME;
    }

    /**
     * Fetches all the users
     */
    all = () => {
        const sql = `
    SELECT p.*, u.firstname||' '||u.lastname "user"
    FROM ${TABLE.contacts} p
    LEFT JOIN ${TABLE.users} u
      ON u.id = p.user_id
    `;

        return this.queryDatabase(sql);
    };

    getuser = (id) => {
        const sql = `
      SELECT u.* 
      FROM ${TABLE.users} u
      JOIN ${TABLE.contacts} p
        ON u.id = p.user_id
      WHERE p.id = ${id}`;

        return this.queryDatabase(sql);
    };


    /**
     * Get total contacts count
     * @returns {Promise}
     */
    getTotalContactsCount = () => {
        const sql = `
    SELECT count(p.id)
    FROM ${TABLE.contacts} p;
    `;

        return this.queryDatabase(sql);
    };
}

export default Contact;