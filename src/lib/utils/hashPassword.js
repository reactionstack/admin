import { SHA256 } from "crypto-js";

export default (password) => {
  const hashedPassword = SHA256(password).toString();
  return hashedPassword;
};
