import Boom from '@hapi/boom';
import Contact from '../models/contact';

const contact = new Contact();

/**
 * Get all contacts.
 *
 * @returns {Promise}
 */
export function getAllContacts() {
    return contact.all().then((res) => res.rows);
}

/**
 * Get a contact.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getContact(id) {
    return contact.find(id).then((res) => {
        if (res.rows.length === 0) throw Boom.notFound("The contact doesn't exist.");

        return Promise.all([
            getTasksByContact(id),
            getManagerByContact(id),
            getUsersByContact(id)
        ]).then(([tasks, manager, users]) => ({ ...res.rows[0], tasks, manager, users }));
    });
}

/**
 * Get filtered contacts
 * @param {Object} filterData
 */
export function getContactBy(filterData) {
    return contact.filterBy(filterData).then((res) => {
        if (res.rows.length === 0) throw Boom.notFound("The contact doesn't exist.");

        return res.rows;
    });
}

/**
 * Checks if contact exists in the table
 * @param {Object} param0 contact Object
 */
export function checkContactExistence({ title }) {
    return contact.filterBy({ title }).then((res) => {
        if (res.rows.length > 0) throw Boom.badRequest('The contact is already present.');

        return res;
    });
}

/**
 * Create new contact.
 *
 * @param   {Object}  contact
 * @returns {Promise}
 */
export function createContact(contactData) {
    return contact
        .create(contactData)
        .then((res) => contact.find(res.rows[0].id))
        .then((res) => res.rows[0])
        .catch((err) => err);
}

/**
 * Update a contact.
 *
 * @param   {Number|String}  id
 * @param   {Object}         contact
 * @returns {Promise}
 */
export function updateContact(id, contactData) {
    return contact
        .update(id, contactData)
        .then((res) => contact.find(id))
        .then((res) => res.rows[0])
        .catch((err) => err);
}

/**
 * Delete a contact.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteContact(id) {
    return contact.destroy(id);
}

/**
 * Get Manager of the contact
 * @param {number} id Contact Id
 * @returns {Promise}
 */
export function getManagerByContact(id) {
    return contact.getManager(id).then((res) => res.rows[0]);
}

/**
 * Get tasks of a particular contact
 * @param {number} id Contact id
 * @returns {Promise}
 */
export function getTasksByContact(id) {
    return contact.getTasks(id).then((res) => res.rows);
}

/**
 * Get users of a particular contact
 * @param {number} id Contact id
 * @returns {Promise}
 */
export function getUsersByContact(id) {
    return contact.getUsers(id).then((res) => res.rows);
}

/**
 * Assign users to particular contact
 * @param {number} id Contact id
 * @param {Array} userIds Array of user_id
 */
export function syncUsersByContact(id, userIds) {
    const Ids = typeof userIds === 'string' ? JSON.parse(userIds) : userIds;
    return contact.syncUsers(id, Ids);
}