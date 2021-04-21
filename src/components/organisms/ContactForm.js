import { Formik, Form, Field} from 'formik';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
  wrapper: {
    marginTop: '4em',
  },
});

function ContactForm() {
  const classes = useStyles();

  return (
    <Container className={classes.wrapper} maxWidth='sm'>
      <Typography variant='h2' color='primary' gutterBottom>
        Contact form
      </Typography>
      <Formik
        initialValues={{ email: '', name: '', message: '' }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          if (!values.name) {
            errors.name = 'Required';
          } else if (values.name.length < 5) {
            errors.name = 'Must be more then 5 characters';
          }

          if (!values.message) {
            errors.message = 'Required';
          } else if (values.message.length > 15) {
            errors.message = 'Must be 15 characters or less';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(`Message sent, thank you ${values.name}!`);
            resetForm()

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              label='email'
              component={TextField}
              variant='outlined'
              type='email'
              name='email'
              id='email'
              margin='normal'
            />
            <Field
              label='name'
              component={TextField}
              variant='outlined'
              type='text'
              name='name'
              id='name'
              margin='normal'
            />
            <Field
              label='message'
              component={TextField}
              variant='outlined'
              id='message'
              name='message'
              multiline
              as='textarea'
              margin='normal'
            />
            <Button
              type='submit'
              disabled={isSubmitting}
              variant='contained'
              color='primary'
              size='large'
              endIcon={<SendIcon fontSize='small' />}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default ContactForm;
