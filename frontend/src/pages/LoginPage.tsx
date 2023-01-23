import React, {FormEvent, useCallback, useState} from "react";
import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function LoginPage() {

    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("")

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const login = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

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
            setError("Invalid username or password");
        }
    }, [navigate, password, username]);

    return (
        <div>
                <form onSubmit={login} className={"login-container"}>
                    <Grid
                        container
                        className={"login-wrapper"}
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{my: 'auto'}}
                    >
                        <h2>Login</h2>
                        <TextField sx={{width: '25ch'}}
                                   label="Username"
                                   id="outlined-size-small"
                                   size="small"
                                   value={username}
                                   onChange={e => setUsername(e.target.value)}
                        />
                        <FormControl sx={{mt: 1, mx: 'auto', width: '25ch'}} variant="outlined">
                            <InputLabel
                                htmlFor="outlined-adornment-password"
                                size={"small"}
                            >
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                size="small"
                            />
                        </FormControl>
                        <Button sx={{mt: 2, width: '28.5ch'}} variant="contained" color="success">Login</Button>
                        {/*<Button sx={{mt: 1, mb: 2}} href="/signup" size="small">Sign Up</Button>*/}
                    </Grid>
                </form>

        </div>
    );
}