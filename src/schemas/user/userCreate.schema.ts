import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../../interfaces/users";

export const userCreateSchema: SchemaOf<IUserRequest> = yup.object().shape({
  firstName: yup
    .string()
    .required("The firstName field is mandatory")
    .max(15, "The firstName field must contain a maximum of 15 characters"),
  lastName: yup
    .string()
    .required("The lastName field is mandatory")
    .max(15, "The lastName field must contain a maximum of 15 characters"),
  email: yup
    .string()
    .email("Send as valid email")
    .required("The email field is mandatory")
    .max(45, "The email field must contain a maximum of 15 characters"),
  password: yup
    .string()
    .required("The password field is mandatory")
    .max(100, "The password field must contain a maximum of 15 characters")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "The password field must contain at least one uppercase letter, one lowercase letter, a special character, a number and at least 8 digits."
    ),
  birthdate: yup
    .string()
    .required("The birthdate field is mandatory")
    .matches(
      /^\d{4}[\-](0[1-9]|1[0-2])[\-](0[1-9]|[12][0-9]|3[01])$/,
      "Format should be yyyy-mm-dd"
    ),
  bio: yup
    .string()
    .required("The bio field is mandatory")
    .max(1000, "The bio field must contain a maximum of 100 characters"),
});
