import {FieldError} from "react-hook-form";

export const addErrorIntoField = (errors : FieldError | undefined) =>
    errors ? { error: true} : { error : false}


