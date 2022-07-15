import Joi from 'joi';

export const isRequired = (
  value: string,
  fieldName: string
): Joi.ValidationResult => {
  return Joi.string()
    .required()
    .messages({ 'string.empty': `השדה ${fieldName} הינו חובה` })
    .validate(value);
};

export const isEmail = (
  value: string,
  fieldName: string
): Joi.ValidationResult => {
  return Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': `השדה ${fieldName} לא תקין`,
      'string.empty': `השדה ${fieldName} הינו חובה`
    })
    .validate(value);
};

export const isPhoneNumber = (
  value: string,
  fieldName: string
): Joi.ValidationResult => {
  return Joi.string()
    .required()
    .length(10)
    .pattern(/^05\d{8}$/)
    .messages({
      'string.length': `${fieldName} אינו תקין`,
      'string.pattern': `${fieldName} אינו תקין`,
      'string.empty': `השדה ${fieldName} הינו חובה`
    })
    .validate(value);
};

export const isPassword = (
  value: string,
  fieldName: string
): Joi.ValidationResult => {
  const minCharachters = 6;

  return Joi.string()
    .required()
    .min(minCharachters)
    .messages({
      'string.min': `${fieldName} צריכה להיות לפחות ${minCharachters} תווים`,
      'string.empty': `השדה ${fieldName} הינו חובה`
    })
    .validate(value);
};
