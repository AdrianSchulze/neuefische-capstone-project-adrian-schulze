import Box from "@mui/material/Box";

export default function NotFound() {


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            margin={"auto"}
        >
            <Box textAlign={"center"}>
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for could not be found.</p>
                <a href={"/login"}>Click here to get back to the login page</a>
            </Box>
        </Box>
    )
}