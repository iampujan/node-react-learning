import HttpStatus from 'http-status-codes';

import * as contactService from '../services/contactService';

/**
 * Get all contacts.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
    contactService
        .getAllContacts()
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Get a contact by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
    contactService
        .getContact(req.params.id)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Create a new contact.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
    contactService
        .createContact(req.body)
        .then(data => res.status(HttpStatus.CREATED).json({ data }))
        .catch(err => next(err));
}

/**
 * Update a contact.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
    contactService
        .updateContact(req.params.id, req.body)
        .then(data => res.json({ data }))
        .catch(err => next(err));
}

/**
 * Delete a contact.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteContact(req, res, next) {
    contactService
        .deleteContact(req.params.id)
        .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
        .catch(err => next(err));
}
