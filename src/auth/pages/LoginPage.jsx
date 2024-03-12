import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"

export const LoginPage = () => {
  return (
    <>
      <AuthLayout title='Login'>
          <form>
            <Grid container>

              <Grid item xs={ 12 } sx={{marginTop: 2}}>
                <TextField label='Email' type='email' placeholder='example@example.com' fullWidth />
              </Grid>

              <Grid item xs={ 12 } sx={{marginTop: 2}}>
                <TextField label='Password' type='password' placeholder='**********' fullWidth />
              </Grid>

              <Grid container spacing={ 2 } sx={{ marginBottom: 2, marginTop: 1 }}>
                <Grid item xs={ 12 }>
                  <Button variant='contained' fullWidth>
                    Login
                  </Button>
                </Grid>

                <Grid item xs={ 12 }>
                  <Button variant='contained' fullWidth>
                    <Google/>
                      <Typography sx={{marginLeft: 1}}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Link color='inherit' to='/auth/register' component={ RouterLink } >
                  Create account
                </Link>
              </Grid>

            </Grid>
          </form>
      </AuthLayout>
    
    </>
  )
}
