import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TaskItem from '../molecules/TaskItem';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { getTasks, deleteTask as removeTask, updateTask } from '../../request';

const useStyles = makeStyles({
  wrapper: {
    marginTop: '4em',
  },
});

function TasksList() {
  const classes = useStyles();
  const history = useHistory();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => {
        console.error(err);
        alert('Something went wrong. Please try again!')
      });
  }, []);

  const deleteTask = (id) => {
    removeTask(id)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong. Please try again!')
      });
  };

  const toggleTaskDone = (id) => {
    const taksToUpdate = tasks.filter((task) => task.id === id)[0];
    updateTask(id, {
      text: taksToUpdate.text,
      done: !taksToUpdate.done,
    })
      .then((res) =>
        setTasks(tasks.map((task) => (task.id === id ? { ...task, done: res.data.done } : task))),
      )
      .catch((err) => {
        console.error(err);
        alert('Something went wrong. Please try again!')
      });
  };

  const tasksList = tasks.map((task) => (
    <TaskItem
      task={task}
      key={task.id.toString()}
      onDelete={deleteTask}
      onToggle={toggleTaskDone}
    />
  ));

  return (
    <Container className={classes.wrapper} maxWidth='sm'>
      <Typography variant='h2' color='primary' gutterBottom>
        Tasks list
      </Typography>
      <Button variant='contained' color='secondary' onClick={() => history.push(`/add`)}>
        Add new task
      </Button>
      <List>{tasksList}</List>
    </Container>
  );
}

export default TasksList;
