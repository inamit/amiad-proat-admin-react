import { Enum, EnumValue } from './enum';

export const UserRoles: Enum<number> = {
  STUDENT: { value: 1, label: 'תלמיד' },
  TUTOR: { value: 2, label: 'מתרגל' },
  TEACHER: { value: 3, label: 'מורה' },
  ADMIN: { value: 4, label: 'מנהל' }
};

export const getUserRoleByValue = (value: number): EnumValue<number> => {
  return Object.values(UserRoles).find((role) => role.value === value);
};
