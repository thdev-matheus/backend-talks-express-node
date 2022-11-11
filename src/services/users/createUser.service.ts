import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";
import { hashSync } from "bcrypt";
import { sendEmail } from "../../utils/sendMail.util";
import { isValidEmailProvider } from "../../utils/isValidEmailProvider";
import jwt from "jsonwebtoken";

export const createUserService = async ({
  firstName,
  lastName,
  email,
  password,
  birthdate,
  bio,
}: IUserRequest) => {
  if (!firstName || !lastName || !email || !password || !birthdate || !bio) {
    throw new AppError(
      400,
      "The following fields are mandatory: firstName, lastName, email, password and birthdate.",
      "https://http.cat/400"
    );
  }

  const isValidProvider = isValidEmailProvider(email);

  if (!isValidProvider) {
    throw new AppError(
      400,
      "only google email, hotmail or outlook are accepted on this platform.",
      "https://http.cat/400"
    );
  }

  const userRepository = AppDataSource.getRepository(User);
  const userAlreadyExists = await userRepository.findOneBy({ email });

  if (userAlreadyExists) {
    throw new AppError(409, "Email already exists", "https://http.cat/409");
  }

  const newUser = userRepository.create({
    firstName,
    lastName,
    email,
    password: hashSync(password, 10),
    birthdate: new Date(birthdate), //data tem que ser no formato aaaa/mm/dd
    bio,
    profileImage:
      "https://i.ibb.co/hM0XsT4/21-214439-free-high-quality-person-icon-default-profile-picture.png",
    isAdm: email === "matheusth.dev@gmail.com" ? true : false,
  });

  await userRepository.save(newUser);

  if (newUser) {
    const token = jwt.sign(
      { email: newUser.email, id: newUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "48h" }
    );
    const subject = "Não Responda - Confirmação de email";
    const link = "https://www.linkedin.com/in/th-matheus/"; // Este link deve ser uma rota do front que em sua montagem faça um patch no users/validate/ passando o token no BODY
    const text = `
    <h3>Bem vindo(a) a Talks, a rede social da família Souza criada por Matheus Vieira. Copie o token abaixo, abra o link, cole-o e envie para verificar o seu e-mail. Após isso, o seu completo acesso à plataforma estará liberado.</h3>
    <br>
    <span>${token}</span>
    <br>
    <br>
    <a href=${link} target="_blank" style="text-decoration: none; background: #58B19F; color: #fff; padding: 0.5rem; border-radius: 0.5rem;" align="center">Verificar</a>
    `;
    const to = newUser.email;

    await sendEmail({ subject, text, to });
  }

  return newUser;
};
