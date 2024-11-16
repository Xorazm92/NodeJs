import { object, string, ref, date, boolean } from "joi";

export function userValidation(data) {
  const schemaUser = object({
    name: string(),
    email: string().email().lowercase(),
    password: string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
    role: string(),
    avatar: string().default("/author/avatar.png"),
    username: string(),
    brith_of_date: date().default(Date.now),
    phone_number:string(),
    is_active: boolean().default(false),
    created_at: date(),
    lastLogin: date(),
    updated_at: date(),
  });

  return schemaUser.validate(data, {abortEarly: false});
}






