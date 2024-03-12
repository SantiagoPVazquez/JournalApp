import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"

export const RegisterPage = () => {
  return (
    <>
        <AuthLayout title='Register'>
        <form>
            <Grid container>

              <Grid item xs={ 12 } sx={{marginTop: 2}}>
                <TextField label='Name' type='text' placeholder='Your name' fullWidth />
              </Grid>

              <Grid item xs={ 12 } sx={{marginTop: 2}}>
                <TextField label='Email' type='email' placeholder='example@example.com' fullWidth />
              </Grid>

              <Grid item xs={ 12 } sx={{marginTop: 2}}>
                <TextField label='Password' type='password' placeholder='**********' fullWidth />
              </Grid>

              <Grid container spacing={ 2 } sx={{ marginBottom: 2, marginTop: 1 }}>
                <Grid item xs={ 12 }>
                  <Button variant='contained' fullWidth>
                    Register
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{marginRight: 1}}>Already have an account?</Typography>
                <Link color='inherit' to='/auth/login' component={ RouterLink } >
                  Login
                </Link>
              </Grid>

            </Grid>
          </form>

        </AuthLayout>
    </>
  )
}
