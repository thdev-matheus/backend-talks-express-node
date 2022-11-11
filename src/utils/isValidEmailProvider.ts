export const isValidEmailProvider = (email: string) => {
  const splitedEmail = email.split("@");
  const splitedProvider = splitedEmail[1].split(".");
  const provider = splitedProvider[0];

  const google = provider === "gmail";
  const hotmail = provider === "hotmail";
  const outlook = provider === "outlook";

  if (!google && !hotmail && !outlook) {
    return false;
  }

  return true;
};
