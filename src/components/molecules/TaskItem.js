import React from 'react';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function TaskItem({ task, onDelete, onToggle }) {
  const history = useHistory();

  return (
    <ListItem key={task.id.toString()} dense disableGutters divider>
      <ListItemIcon>
        <Checkbox edge='start' checked={task.done} onChange={() => onToggle(task.id)} />
      </ListItemIcon>
      <ListItemText id={task.id.toString()} primary={task.text} />
      <ListItemSecondaryAction>
        <IconButton edge='end' aria-label='delete' onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton edge='end' aria-label='edit' onClick={() => history.push(`/list/${task.id}`)}>
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default TaskItem;
