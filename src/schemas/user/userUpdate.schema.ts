import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserUpdate } from "../../interfaces/users";

export const userUpdateSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  oldPassword: yup.string().required("The oldPassword field is mandatory"),
  bio: yup
    .string()
    .max(1000, "The bio field must contain a maximum of 100 characters"),
  birthdate: yup
    .string()
    .matches(
      /^\d{4}[\-](0[1-9]|1[0-2])[\-](0[1-9]|[12][0-9]|3[01])$/,
      "Format should be yyyy-mm-dd"
    ),
  password: yup
    .string()
    .max(100, "The password field must contain a maximum of 15 characters")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "The password field must contain at least one uppercase letter, one lowercase letter, a special character, a number and at least 8 digits."
    ),
  firstName: yup
    .string()
    .max(15, "The firstName field must contain a maximum of 15 characters"),
  lastName: yup
    .string()
    .max(15, "The lastName field must contain a maximum of 15 characters"),
  profileImage: yup.string().url("Submit a valid url"),
});
