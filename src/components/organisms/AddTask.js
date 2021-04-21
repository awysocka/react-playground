import React from 'react';
import AddEditTaskForm from '../molecules/AddEditTaskForm';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { addTask } from '../../request';

const useStyles = makeStyles({
  wrapper: {
    marginTop: '4em',
  },
});

function AddTask() {
  const classes = useStyles();
  const history = useHistory();

  const addNewTask = (taskText) => {
    addTask({
      text: taskText,
      done: false,
    })
      .then(() => history.push('/list'))
      .catch((err) => {
        console.error(err);
        alert('Something went wrong. Please try again!')
      });
  };

  return (
    <Container className={classes.wrapper} maxWidth='sm'>
      <Typography variant='h2' color='primary' gutterBottom>
        Add new task
      </Typography>
      <AddEditTaskForm initialValue={''} onSave={addNewTask} />
    </Container>
  );
}

export default AddTask;
