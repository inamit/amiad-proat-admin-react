import React, { useEffect } from 'react';
import { AsyncSelectFormField, FormField } from 'models/fieldsConfigs';
import TextFieldSelect, { TextFieldSelectProps } from '../TextFieldSelect';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const TextFieldAsyncSelect = (props: TextFieldSelectProps) => {
  const [children, setChildren] = React.useState([]);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    getChildren();
  }, []);

  const getChildren = async () => {
    try {
      const values = await (
        props.field as AsyncSelectFormField
      ).asyncChildren();
      setChildren(values);
    } catch (error) {
      MySwal.fire({
        title: `שגיאה בקבלת נתונים עבור ${props.field.placeholder}`,
        icon: 'error',
        text: error.message
      });
    }
  };

  return (
    <TextFieldSelect
      field={{ ...props.field, children } as FormField}
      value={props.value}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      error={props.error}
      helperText={props.helperText}
    />
  );
};

export default TextFieldAsyncSelect;
