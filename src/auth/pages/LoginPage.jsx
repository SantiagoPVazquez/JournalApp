import { useMemo } from "react"
import { Google } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { logout, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"


const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {

  const {status, errorMessage} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const {email, password, onInputChange, formState} = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status])
  

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword(formState))
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIn());
  }
  return (
    <>
      <AuthLayout title='Login'>
          <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>

              <Grid item xs={ 12 } sx={{marginTop: 2}}>
                <TextField label='Email' type='email' placeholder='example@example.com' fullWidth name="email" value={ email } onChange={onInputChange} />
              </Grid>

              <Grid item xs={ 12 } sx={{marginTop: 2}}>
                <TextField label='Password' type='password' placeholder='**********' fullWidth name="password" value={ password } onChange={onInputChange}/>
              </Grid>

              <Grid container spacing={ 2 } sx={{ marginBottom: 2, marginTop: 1 }}>
                
                <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none'}>
                  <Alert severity='error'>{errorMessage}</Alert>  
                </Grid>


                <Grid item xs={ 12 }>
                  <Button type='submit' variant='contained' fullWidth disabled={isAuthenticating}>
                    Login
                  </Button>
                </Grid>

                <Grid item xs={ 12 }>
                  <Button variant='contained' fullWidth onClick={onGoogleSignIn} disabled={isAuthenticating}>
                    <Google/>
                      <Typography sx={{marginLeft: 1}}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Link color='inherit' to='/auth/register' component={ RouterLink } onClick={ () => dispatch(logout()) }>
                  Create account
                </Link>
              </Grid>

            </Grid>
          </form>
      </AuthLayout>
    
    </>
  )
}
