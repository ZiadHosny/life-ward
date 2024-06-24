import { string, date , object, number } from "yup";

export const formData = {
  initialVals: {
    name: "",
    phone: "",
    email: "",
    password: "",
    image: "",
    birthDate: "",
    gender: "",
  },
  validation: object({
    name: string(),
    phone: number(),
    email: string().email(),
    password: string(),
    image: string(),
    gender: string(),
    birthDate: date(),
  }),
};
