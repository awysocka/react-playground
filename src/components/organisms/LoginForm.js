import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import { setToken } from '../../auth';

const useStyles = makeStyles({
  title: {
    marginBottom: '2rem',
    marginTop: '6rem',
  },
});

function LoginForm({ handleLogin }) {
  const location = useLocation();

  const classes = useStyles();

  const history = useHistory();
  const { register, handleSubmit, errors, setError, getValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {
    const formValue = getValues(['email', 'password']);
    axios
      .post(
        'https://us-central1-simple-todolist-rest-api.cloudfunctions.net/login',
        {
          email: formValue.email,
          password: formValue.password,
        },
      )
      .then((res) => setToken(res.data.idToken))
      .then(() => handleLogin())
      .then(() => history.push(location.state.prevLocation || '/list'))
      .catch((error) => {
        const formError = { type: 'server', message: 'Username or Password Incorrect' };
        setError('password', formError);
        console.error(error)
      });
  };

  return (
    <Grid container component='div' direction='column' justify='center' alignItems='center'>
      <Grid item xs={12}>
        <Typography className={classes.title} variant='h2' color='primary'>
          Login
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {/* <Typography color='error'>{errors.serverError?.message}</Typography> */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            id='email'
            name='email'
            type='email'
            label='email'
            variant='outlined'
            margin='normal'
            required
            inputRef={register({
              required: true,
              minLength: 5,
            })}
            error={Boolean(errors.email)}
          />
          {errors.email && errors.email.type === 'required' && (
            <Typography color='error'>This is required</Typography>
          )}
          {errors.email && errors.email.type === 'minLength' && (
            <Typography color='error'>Min length 5 letters</Typography>
          )}
          <TextField
            id='password'
            name='password'
            type='password'
            label='password'
            variant='outlined'
            margin='normal'
            required
            inputRef={register({
              required: true,
            })}
            error={Boolean(errors.password)}
          />
          {errors.password && errors.password.type === 'required' && <Typography color='error'>This field can't be empty</Typography>}
          {errors.password && errors.password.type === 'server' && <Typography color='error'>{errors.password?.message}</Typography>}
          <Button
            className={classes.button}
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            endIcon={<ChevronRightIcon fontSize='small' />}
          >
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
