import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from './../../config/auth.js';
import User from '../models/User.js';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });
    const isValid = await schema.isValid(request.body, {
      abortEarly: false,
      strict: true,
    });
    if (!isValid) {
      return response
        .status(400)
        .json({ error: 'Email or password is invalid!' });
    }
    const { email, password } = request.body;

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return response.status(400).json({ message: 'Email already taken!' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password_hash,
    );

    if (!isPasswordCorrect) {
      return response
        .status(400)
        .json({ error: 'Email or password incorrect' });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        admin: existingUser.admin,
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      },
    );

    return response.status(200).json({
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        admin: existingUser.admin,
        token: token,
    });
  }
}

export default new SessionController();
