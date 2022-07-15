import Joi from 'joi';

export const isDateRequired = (
  value: string,
  fieldName: string
): Joi.ValidationResult => {
  return Joi.date()
    .required()
    .messages({ 'any.required': `השדה ${fieldName} הינו חובה` })
    .validate(value);
};
