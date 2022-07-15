import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton
} from '@mui/material';
import {
  DataGrid,
  GridRowsProp,
  GridColumns,
  GridColDef,
  GridActionsCellItem,
  GridRowParams,
  GridRowId,
  ValueOptions
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect } from 'react';
import { getUsersWithRoleBiggerThan } from 'dal/users.dal';
import { UserRoles } from 'models/enums/userRoles';
import User from 'models/user';
import AddGroup from '../AddGroup';
const initialRows: GridRowsProp = [
  {
    id: 'asaadasdd',
    name: 'קבוצה 1234',
    teacher: 'עמית',
    subject: 'מתמטיקה',
    dayInWeek: 'חמישי',
    hour: '18:00'
  }
];
type Row = typeof initialRows[number];

const ListGroups = () => {
  const [addGroupOpen, setAddGroupOpen] = React.useState<boolean>(false);
  const [teachers, setTeachers] = React.useState<User[]>([]);

  useEffect(() => {
    getUsersWithRoleBiggerThan(UserRoles.TEACHER).then((users) => {
      setTeachers(users);
    });
  }, []);
  const deleteGroup = React.useCallback(
    (id: GridRowId) => () => {
      alert(`DELETE ${id}`);
    },
    []
  );
  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: 'name',
        headerName: 'שם השיעור',
        editable: true,
        width: 300
      },
      {
        field: 'teacher',
        headerName: 'מורה',
        type: 'singleSelect',
        editable: true,
        valueOptions: () => {
          return teachers.map((teacher) => ({
            value: teacher.uid,
            label: `${teacher.firstName} ${teacher.lastName}`
          }));
        }
      },
      { field: 'subject', headerName: 'מקצוע' },
      { field: 'dayInWeek', headerName: 'יום' },
      { field: 'hour', headerName: 'שעה' },
      {
        field: 'actions',
        type: 'actions',
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            icon={<DeleteIcon sx={{ '&': { color: 'red' } }} />}
            label="מחיקה"
            onClick={deleteGroup(params.id)}
          />
        ]
      }
    ],
    [deleteGroup]
  );

  return (
    <div>
      <Card
        sx={{
          '&': {
            margin: '5vh 10vw'
            //   height: '80%'
          }
        }}
      >
        <CardHeader
          title="שיעורים"
          action={
            <Button variant="contained" onClick={() => setAddGroupOpen(true)}>
              הוספת שיעור
            </Button>
          }
        />
        <Divider />
        <CardContent>
          <DataGrid autoHeight={true} rows={initialRows} columns={columns} />
        </CardContent>
      </Card>
      <AddGroup isOpen={addGroupOpen} onClose={() => setAddGroupOpen(false)} />
    </div>
  );
};

export default ListGroups;
