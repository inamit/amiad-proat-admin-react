import Joi from 'joi';

export const isArrayRequired = (
  value: any[],
  fieldName: string
): Joi.ValidationResult => {
  return Joi.array()
    .min(1)
    .messages({ 'array.min': `יש לבחור ${fieldName}` })
    .validate(value);
};
