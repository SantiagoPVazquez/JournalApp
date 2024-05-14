import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { logout, startCreatingUserWithEmailPassword } from "../../store/auth"

const formData = {
  displayName: '',
  email: '',
  password: '',
}

const formValidations = {
  displayName: [(value) => value.length >= 1 , 'Name is required'],
  email: [(value) => value.includes('@') , 'Email must be a valid adress'],
  password: [(value) => value.length >= 8 , 'Password must be at least 8 characters long'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false)

  const {status, errorMessage} = useSelector(state => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const {displayName, email, password, onInputChange, formState, displayNameValid, emailValid, passwordValid, isFormValid} = useForm(formData, formValidations);
  

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch( startCreatingUserWithEmailPassword(formState) );
  }

  return (
    <>
        <AuthLayout title='Register'>
        <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>

              <Grid item xs={ 12 } sx={{marginTop: 2}}>
                <TextField label='Name' type='text' placeholder='Your name' fullWidth value={displayName} name="displayName" onChange={onInputChange} error={ !!displayNameValid && formSubmitted } helperText = {(formSubmitted) ? displayNameValid : null}/>
              </Grid>

              <Grid item xs={ 12 } sx={{marginTop: 2}}>
                <TextField label='Email' type='email' placeholder='example@example.com' fullWidth value={email} name="email" onChange={onInputChange} error={ !!emailValid && formSubmitted } helperText = {(formSubmitted) ? emailValid : null}/>
              </Grid>

              <Grid item xs={ 12 } sx={{marginTop: 2}}>
                <TextField label='Password' type='password' placeholder='**********' fullWidth value={password} name="password" onChange={onInputChange} error={ !!passwordValid && formSubmitted } helperText = {(formSubmitted) ? passwordValid : null}/>
              </Grid>

              <Grid container spacing={ 2 } sx={{ marginBottom: 2, marginTop: 1 }}>

                <Grid item xs={ 12 } display={!!errorMessage ? '' : 'none'}>
                  <Alert severity='error'>{errorMessage}</Alert>
                </Grid>

                <Grid item xs={ 12 }>
                  <Button variant='contained' fullWidth type="submit" disabled={isAuthenticating}>
                    Register
                  </Button>
                </Grid>
              
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{marginRight: 1}}>Already have an account?</Typography>
                <Link color='inherit' to='/auth/login' component={ RouterLink } onClick={ () => dispatch(logout()) }>
                  Login
                </Link>
              </Grid>

            </Grid>
          </form>

        </AuthLayout>
    </>
  )
}
