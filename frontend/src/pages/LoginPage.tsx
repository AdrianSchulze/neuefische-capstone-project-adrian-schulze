import React, {FormEvent, useCallback, useState} from "react";
import {
    Avatar,
    Box,
    Button, Container, CssBaseline,
    Grid,
    TextField, Typography
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";

export default function LoginPage() {

    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("")

    //const [error, setError] = useState("");

    const navigate = useNavigate();

    const login = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // setError("");

        try {
            await axios.post("/api/users/login", null, {
                headers: {
                    "Authorization": "Basic " + window.btoa(
                        username + ":" + password
                    )
                }
            });
            navigate("/");
        } catch (e) {
            // setError("Invalid username or password");
            console.log(e);
        }
    }, [navigate, password, username]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, background: '#2E3B55'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
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
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="success"
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item
                              sx={{m:"auto"}}>
                            <Link to={"#"}>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}