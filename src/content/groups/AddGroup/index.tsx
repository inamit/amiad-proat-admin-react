import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  Box,
  Button
} from '@mui/material';
import GenericFormFields from 'components/GenericFormFields';
import { Subjects } from 'models/enums/subjects';
import { FormFieldType } from 'models/fieldsConfigs';
import React, { useEffect } from 'react';
import { addGroupFields } from './addGroupFields';
import { AddGroupModel } from './addGroupModel';

interface AddGroupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGroup = (props: AddGroupProps) => {
  const initialGroup: AddGroupModel = {
    name: '',
    teacher: '',
    subject: Subjects.MATH.value,
    dayInWeek: undefined,
    hour: ''
  };
  const [group, setGroup] = React.useState<AddGroupModel>(initialGroup);
  const [validationErrors, setValidationErrors] = React.useState<{
    [key: string]: string;
  }>({});
  const [valid, setValid] = React.useState<boolean>(false);

  useEffect(() => {
    setValid(areFieldsValid());
  }, [group]);

  const isFieldValid = (field: FormFieldType, addToList: boolean = true) => {
    const validationResult = field.validationFunction(
      group[field.objectLocation],
      field.placeholder
    );

    if (addToList) {
      setValidationErrors({
        ...validationErrors,
        [field.objectLocation]: validationResult.error?.message
      });
    }

    return validationResult.error?.message === undefined;
  };

  const areFieldsValid = () => {
    return addGroupFields
      .filter(
        (field) =>
          field.showConditions
            ?.map((condition) =>
              eval(
                group[condition.field] + condition.operator + condition.value
              )
            )
            .reduce((final, curr) => final && curr) ?? true
      )
      .reduce((acc, field) => isFieldValid(field, false) && acc, true);
  };

  const addGroup = () => {
    alert('FORM IS VALID AND SUBMITTED');
  };

  return (
    <Dialog open={props.isOpen} onClose={props.onClose}>
      <DialogTitle>יצירת שיעור חדש</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            '&': {
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center'
            },
            // '& .MuiFormControl-root': { alignSelf: 'center' },
            '& .MuiTextField-root': { marginBottom: '3vh', width: '100%' }
          }}
          noValidate
          autoComplete="off"
        >
          <GenericFormFields
            formFields={addGroupFields}
            formValues={group}
            setValues={setGroup}
            validationErrors={validationErrors}
            isFieldValid={isFieldValid}
          />
          <Button
            sx={{ '&': { alignSelf: 'center' } }}
            disabled={!valid}
            onClick={() => {
              areFieldsValid() && addGroup();
            }}
            variant="contained"
          >
            צור שיעור
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroup;
