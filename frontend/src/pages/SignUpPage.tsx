import React, {useState} from "react";
import {
    Button,
    Container, CssBaseline, FilledInput, FormControl,
    Grid, IconButton, InputAdornment, InputLabel,
    TextField, Typography
} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import {toast} from "react-toastify";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {addErrorIntoField} from "../components/utils";
import SimpleBackdrop from "../components/LoadingBackdrop";

const schema = yup.object({
    username: yup
        .string()
        .min(5,"Username must contain at least 5 characters")
        .max(20, "Username can contain a maximum of 20 characters")
        .required(),
    password: yup
        .string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Password must contain minimum eight characters, at least one letter and one number")
        .required(),
})
    .required();

type FormData = yup.InferType<typeof schema>;

export default function SignUpPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        handleToggle();
        try {
            await axios.post("/api/users/signup", data);
                setTimeout(() => {
                    navigate("/login" + location.search);
                    handleToggle();
                    toast.success("Successfully created your account!")
                }, 4000)
        } catch (e) {
            toast.error("Invalid user data: " + e);
        }
    };

    const handleToggle = () => {
        setOpen(!open);
    };


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
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    variant={"filled"}
                                    id="username"
                                    label="Username"
                                    autoComplete="username"
                                    {...register("username")}
                                    {...addErrorIntoField(errors["username"])}
                                />
                            </Grid>
                            <span className={"errorUsername"}
                                  style={{display: errors["username"] ? 'block' : 'none' }}
                            >
                                {errors.username?.message}
                            </span>
                            <Grid item xs={12}>
                                <FormControl fullWidth required variant="filled">
                                    <InputLabel htmlFor="outlined-adornment-password" {...addErrorIntoField(errors["password"])}>Password</InputLabel>
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
                                        autoComplete="new-password"
                                        {...register("password")}
                                        {...addErrorIntoField(errors["password"])}
                                    />
                                    <span className={"error"}
                                          style={{display: errors["password"] ? 'block' : 'none' }}
                                    >
                                        {errors.password?.message}
                                    </span>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item sx={{m: "auto"}}>
                                <Link to={"/login"} className={"formBottomText"}>
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}