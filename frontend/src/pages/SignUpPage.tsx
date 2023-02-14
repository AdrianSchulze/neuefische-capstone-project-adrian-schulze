import React, {FormEvent, useCallback, useState} from "react";
import {
    Avatar,
    Button,
    Container, CssBaseline, FormControl,
    Grid, IconButton, InputAdornment, InputLabel, OutlinedInput,
    TextField, Typography
} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import {toast} from "react-toastify";
import {Visibility, VisibilityOff} from "@mui/icons-material";


export default function SignUpPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCredentials({...credentials, [name]: value});
        },
        [credentials, setCredentials]
    );

    const navigate = useNavigate();

    const location = useLocation();

    const signUp = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
                await axios.post("/api/users/signup", credentials);
                navigate("/login" + location.search);
            } catch (e) {
                toast.error("Invalid user data: " + e);
            }
        },
        [credentials, navigate, location]
    );

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    padding: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                }}
            >
                <Avatar sx={{ m: 1, background: '#2E3B55' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" noValidate onSubmit={signUp} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                id="username"
                                label="Username"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth required>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item sx={{m:"auto"}}>
                            <Link to={"/login"}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}