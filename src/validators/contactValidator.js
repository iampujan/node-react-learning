import Joi from '@hapi/joi';
import Boom from '@hapi/boom';

import validate from '../utils/validate';
import * as contactService from '../services/contactService';

// Validation schema
const schema = Joi.object({
    name: Joi.string().max(100).required(),
    phone: Joi.string().max(100).required(),
    photograph: Joi.string().max(1000).required(),
    user_id: Joi.number().required()
});

/**
 * Validate create/update contact request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function contactValidator(req, res, next) {
    return validate(req.body, schema)
        .then(() => next())
        .catch((err) => next(err));
}

/**
 * Validate contacts existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findContact(req, res, next) {
    return contactService
        .getContact(req.params.id)
        .then(() => next())
        .catch((err) => next(err));
}


export { findContact, contactValidator };