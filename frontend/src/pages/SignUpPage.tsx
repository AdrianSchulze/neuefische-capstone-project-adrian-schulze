import {useState} from "react";
import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function SignUpPage() {

    const [name, setName] = useState<String>("");
    const [password, setPassword] = useState<String>("")

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            <Grid>
                <Paper
                    elevation={5}
                    className={"login-container"}
                >
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{my: 'auto'}}
                    >
                        <h2>Sign Up</h2>
                        <TextField sx={{width: '25ch'}}
                                   label="Username"
                                   id="outlined-size-small"
                                   size="small"
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
                        <Button sx={{mt: 2, width: '28.5ch'}} variant="contained" color="success">Sign Up</Button>
                        <Button sx={{mt: 1, mb: 2}} href="/login" size="small">Back</Button>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}