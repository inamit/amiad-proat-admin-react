import { Enum, EnumValue } from './enum';

export const DaysOfWeek: Enum<number> = {
  SUNDAY: { value: 7, label: 'ראשון' },
  MONDAY: { value: 1, label: 'שני' },
  TUESDAY: { value: 2, label: 'שלישי' },
  WEDNESDAY: { value: 3, label: 'רביעי' },
  THURSDAY: { value: 4, label: 'חמישי' },
  FRIDAY: { value: 5, label: 'שישי' },
  SATURDAY: { value: 6, label: 'שבת' }
};

export const getDayOfWeekByValue = (value: number): EnumValue<number> => {
  return Object.values(DaysOfWeek).find((day) => day.value === value);
};
