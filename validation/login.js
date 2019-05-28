//login.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.Email = !isEmpty(data.Email) ? data.Email : '';
    data.Password = !isEmpty(data.Password) ? data.Password : '';

    if(!Validator.isEmail(data.Email)) {
        errors.Email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.Email)) {
        errors.Email = 'Email is required';
    }

    if(!Validator.isLength(data.Password, {min: 6, max: 30})) {
        errors.Password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.Password)) {
        errors.Password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
