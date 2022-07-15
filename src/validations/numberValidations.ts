import Joi from 'joi';

export const isNumberRequired = (
  value: number,
  fieldName: string
): Joi.ValidationResult => {
  return Joi.number()
    .required()
    .messages({ 'any.required': `השדה ${fieldName} הינו חובה` })
    .validate(value);
};
