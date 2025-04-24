import { setCookie } from "./cookie";
export function setUserCookie(key, value, days) {
  if (value) {
    const {
      unique_id,
      email,
      phone,
      display_name,
      name,
      email_verified,
      account_verified,
      account_status,
      password_verified,
      roles,
      token_detail,
      address,
      gender,
      dob,
    } = value;
    let userData = {
      unique_id,
      email,
      phone,
      display_name,
      name,
      email_verified,
      account_verified,
      account_status,
      password_verified,
      roles,
      token_detail,
      address,
      gender,
      dob,
    };
    setCookie(key, userData, days);
  }
}
export function setUserToken(key, value) {
  if (value) {
    setCookie(key, value);
  }
}
