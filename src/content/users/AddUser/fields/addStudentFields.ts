import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { getGroupsForSelect } from 'dal/groups.dal';
import { getGrades } from '../../../../dal/config.dal';
import { FieldType } from '../../../../models/enums/fieldTypes';
import { Subjects } from '../../../../models/enums/subjects';
import { UserRoles } from '../../../../models/enums/userRoles';
import {
  AsyncSelectFormField,
  FormField,
  SelectFormField,
  SyncSelectFormField
} from '../../../../models/fieldsConfigs';
import Joi from 'joi';
import { isNumberRequired } from 'validations/numberValidations';
import { isRequired } from 'validations/stringValidations';
import { isArrayRequired } from 'validations/arrayValidations';

export const addStudentFields: (
  | FormField
  | SyncSelectFormField
  | AsyncSelectFormField
)[] = [
  {
    showConditions: [
      {
        field: 'role',
        operator: '===',
        value: UserRoles.STUDENT.value
      }
    ],
    objectLocation: 'subjects',
    placeholder: 'מקצועות',
    type: FieldType.SELECT,
    icon: MenuBookOutlinedIcon,
    children: Object.values(Subjects),
    required: true,
    multiple: true,
    validationFunction: isArrayRequired
  },
  {
    showConditions: [
      {
        field: 'role',
        operator: '===',
        value: UserRoles.STUDENT.value
      }
    ],
    objectLocation: 'grade',
    placeholder: 'כיתה',
    type: FieldType.ASYNC_SELECT,
    icon: SchoolOutlinedIcon,
    asyncChildren: getGrades,
    required: true,
    multiple: false,
    validationFunction: isNumberRequired
  },
  {
    showConditions: [
      {
        field: 'role',
        operator: '===',
        value: UserRoles.STUDENT.value
      }
    ],
    objectLocation: 'group',
    placeholder: 'שיעור',
    type: FieldType.ASYNC_SELECT,
    icon: SchoolOutlinedIcon,
    asyncChildren: getGroupsForSelect,
    required: true,
    multiple: false,
    validationFunction: isRequired
  }
];
