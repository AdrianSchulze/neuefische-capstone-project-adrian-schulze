import React, {useState} from "react";
import {
    Avatar,
    Box,
    Button, Container, CssBaseline, FilledInput, FormControl,
    Grid, IconButton, InputAdornment, InputLabel,
    TextField, Typography
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import SimpleBackdrop from "../components/LoadingBackdrop";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addErrorIntoField} from "../components/utils";

const schema = yup.object({
    username: yup
        .string()
        .required("Username is required"),
    password: yup
        .string()
        .required("Password is required"),
})
    .required();

export type FormData = yup.InferType<typeof schema>;

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

    const login = async (dataLogin: FormData) => {
        handleToggle();
        try {
            await axios.post("/api/users/login", null, {
                headers: {
                    "Authorization": "Basic " + window.btoa(
                        dataLogin.username + ":" + dataLogin.password
                    )
                }
            });
            setTimeout(() => {
                navigate("/");
                handleToggle();
                toast.success("Successfully logged in!")
            }, 2000)
        } catch (e) {
            toast.error("Wrong username or password");
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    return (
        <div className={"login-container"}>
            <SimpleBackdrop openBackdrop={open}/>
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
                    <Box component="form" onSubmit={handleSubmit(login)} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            variant="filled"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            autoComplete="username"
                            autoFocus
                            sx={{mb: 0}}
                            {...register("username")}
                            {...addErrorIntoField(errors["username"])}
                        />
                        <span className={"error"}
                              style={{display: errors["username"] ? 'block' : 'none'}}
                        >
                                {errors.username?.message}
                            </span>
                        <FormControl sx={{mt: 1}} variant="filled" fullWidth required>
                            <InputLabel
                                htmlFor="outlined-adornment-password"
                                {...addErrorIntoField(errors["password"])}
                            >
                                Password
                            </InputLabel>
                            <FilledInput
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
                                autoComplete="current-password"
                                {...register("password")}
                                {...addErrorIntoField(errors["password"])}
                            />
                            <span
                                className={"error"}
                                style={{display: errors["password"] ? 'block' : 'none'}}
                            >
                                {errors.password?.message}
                            </span>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item
                                  sx={{m: "auto"}}>
                                <Link to={"/signup"} className={"formBottomText"}>
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