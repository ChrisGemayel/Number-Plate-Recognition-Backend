//register.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.FirstName = !isEmpty(data.FirstName) ? data.FirstName : '';
    data.LastName = !isEmpty(data.LastName) ? data.LastName : '';
    data.Email = !isEmpty(data.Email) ? data.Email : '';
    data.Password = !isEmpty(data.Password) ? data.Password : '';
    data.Password_Confirm = !isEmpty(data.Password_Confirm) ? data.Password_Confirm : '';

    if(!Validator.isLength(data.FirstName, { min: 2, max: 30 })) {
        errors.FirstName = 'First name must be between 2 to 30 chars';
    }

    if(Validator.isEmpty(data.FirstName)) {
        errors.FirstName = 'First name field is required';
    }

    if(!Validator.isLength(data.LastName, { min: 2, max: 30 })) {
        errors.LastName = 'First name must be between 2 to 30 chars';
    }

    if(Validator.isEmpty(data.LastName)) {
        errors.LastName = 'First name field is required';
    }

    if(!Validator.isEmail(data.Email)){
        errors.Email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.Email)){
        errors.Email = 'Email is required';
    }

    if(!Validator.isLength(data.Password, {min: 6, max: 30})) {
        errors.Password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.Password)) {
        errors.Password = 'Password is required';
    }

    if(!Validator.isLength(data.Password_Confirm, {min: 6, max: 30})) {
        errors.Password_Confirm = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.Password, data.Password_Confirm)) {
        errors.Password_Confirm = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.Password_Confirm)) {
        errors.Password_Confirm = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}