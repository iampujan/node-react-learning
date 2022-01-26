import bcrypt from 'bcrypt';
import Boom from '@hapi/boom';
import User from '../models/user';

const user = new User();

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllUsers() {
    return user.all().then((res) => res.rows);
}

/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getUser(id) {
    return user.find(id).then((user) => {
        if (user.rows.length === 0) throw Boom.notFound("The user doesn't exist.");

        return user
    });
}

/**
 * Get filtered users
 * @param {Object} filterData
 */
export function getUserBy(filterData) {
    return user.filterBy(filterData).then((res) => {
        if (res.rows.length === 0) throw Boom.notFound("The user doesn't exist.");

        return res.rows;
    });
}

/**
 * Checks if email exists in the table
 * @param {Object} param0 User Object
 */
export function checkEmailExistence({ email }) {
    return user.filterBy({ email }).then((res) => {
        if (res.rows.length > 0) throw Boom.badRequest('The email is already resgisterd.');

        return res;
    });
}

/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export async function createUser(userData) {
    const { email, password } = userData;

    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10).then((hash) => {
            user
                .create({ ...userData, password: hash })
                .then((res) => user.find(res.rows[0].id))
                .then((res) => resolve(res.rows[0]))
                .catch((err) => reject(err));
        });
    });

    return;
}

/**
 * Update a user.
 *
 * @param   {Number|String}  id
 * @param   {Object}         user
 * @returns {Promise}
 */
export function updateUser(id, userData) {
    if (!userData.password) {
        return user
            .update(id, userData)
            .then((res) => user.find(id))
            .then((res) => res.rows[0])
            .catch((err) => err);
    }

    const { password } = userData;

    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10).then((hash) => {
            user
                .update(id, { ...userData, password: hash })
                .then((res) => user.find(id))
                .then((res) => resolve(res.rows[0]))
                .catch((err) => reject(err));
        });
    });
}

/**
 * Delete a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteUser(id) {
    return user.destroy(id);
}

