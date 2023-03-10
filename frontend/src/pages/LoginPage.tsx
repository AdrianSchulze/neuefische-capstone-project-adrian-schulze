import React, {FormEvent, useCallback, useState} from "react";
import {
    Avatar,
    Box,
    Button, Container, CssBaseline, FormControl,
    Grid, IconButton, InputAdornment, InputLabel, OutlinedInput,
    TextField, Typography
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function LoginPage() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const login = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post("/api/users/login", null, {
                headers: {
                    "Authorization": "Basic " + window.btoa(
                        username + ":" + password
                    )
                }
            });
            navigate("/");
            toast.success("Successfully logged in!")
        } catch (e) {
            toast.error("Wrong username or password");
        }
    }, [navigate, password, username]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className={"login-container"}>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <ToastContainer/>
                <CssBaseline/>
                <Box
                    sx={{
                        padding: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        borderRadius: "4px"
                    }}
                >
                    <Avatar sx={{m: 1, background: '#2E3B55'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Welcome to Channly!
                    </Typography>
                    <Box component="form" onSubmit={login} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            sx={{mb: 0}}
                            color="success"
                        />
                        <FormControl sx={{mt: 1}} variant="outlined" fullWidth required>
                            <InputLabel
                                htmlFor="outlined-adornment-password"
                                color="success"
                            >
                                Password
                            </InputLabel>
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
                                            color="success"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                autoComplete="current-password"
                                value={password}
                                color="success"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            color="success"
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item
                                  sx={{m: "auto"}}>
                                <Link to={"/signup"}>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}