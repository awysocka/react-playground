import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddEditTaskForm from '../molecules/AddEditTaskForm';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { getTask, updateTask } from '../../request';

const useStyles = makeStyles({
  wrapper: {
    marginTop: '4em',
  },
});

function EditTask() {
  const classes = useStyles();
  const { taskId } = useParams();
  const history = useHistory();

  const [taskToEdit, setTaskToEdit] = useState();

  useEffect(() => {
    getTask(taskId)
      .then((res) => setTaskToEdit(res.data))
      .catch((err) => {
        console.error(err);
        alert('Something went wrong. Please try again!')
      });
  }, [taskId]);

  const editTask = (taskText) => {
    updateTask(taskId, {
      text: taskText,
      done: taskToEdit.done,
    })
      .then(() => history.push('/list'))
      .catch((err) => {
        console.error(err);
        alert('Something went wrong. Please try again!')
      });
  };

  return (
    <Container className={classes.wrapper} maxWidth='sm'>
      <Typography variant='h2' color='primary' gutterBottomEdit>
        Edit task
      </Typography>
      <AddEditTaskForm initialValue={taskToEdit?.text} onSave={editTask} />
    </Container>
  );
}

export default EditTask;
