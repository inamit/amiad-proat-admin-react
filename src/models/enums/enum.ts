export interface EnumValue<T> {
  value: T;
  label: string;
}
export interface Enum<T> {
  [key: string]: EnumValue<T>;
}
