import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function AddEditTaskForm({ onSave, initialValue }) {
  const [nameInputValue, setNameInputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialValue) {
      setNameInputValue(initialValue);
    }
  }, [initialValue]);

  const handleValidation = (value) => {
    const errorMessage = !value ? 'Nie może być puste' : '';
    setError(errorMessage);

    return !errorMessage;
  };

  const handleChanges = (e) => {
    setNameInputValue(e.target.value);
    handleValidation(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (handleValidation(nameInputValue)) {
      onSave(nameInputValue);
    }
  };

  return (
    <form>
      <TextField
        label='Task name'
        variant='outlined'
        margin='normal'
        type='text'
        value={nameInputValue}
        onChange={handleChanges}
      />
      <Typography color='error'>{error}</Typography>
      <Button variant='contained' color='secondary' text='Save' onClick={handleClick}>
        Save
      </Button>
    </form>
  );
}

export default AddEditTaskForm;
