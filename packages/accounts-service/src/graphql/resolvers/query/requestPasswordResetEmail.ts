import { reach } from 'yup';
import { ApolloError } from 'apollo-server-express';
import { createUserSchema } from '../../../validation/createUser';
import { sign } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import {
  QueryResolvers,
  EmailMayHaveBeenSent,
  InvalidDataFormat,
  RequestPasswordResetEmailResult,
} from '../../generated';

const requestPasswordResetEmail: QueryResolvers['requestPasswordResetEmail'] = async (
  _,
  { email },
  { prisma }
): Promise<RequestPasswordResetEmailResult> => {
  try {
    await reach(createUserSchema, 'email').validate(email);

    const user = await prisma.user.findOne({ where: { email } });

    if (!user) {
      /*
        Just return true so the end user won't know whether or not
        the email exists, this is for security.
      */
      return {
        __typename: 'EmailMayHaveBeenSent',
        message:
          'If the email you provided was associated to an account, we have sent an email with the instructions to reset your password!',
      };
    }

    const transporterSettings = {
      host: process.env.NODEMAILER_HOST!,
      port: Number(process.env.NODEMAILER_PORT),
      auth: {
        user: process.env.NODEMAILER_USERNAME!,
        pass: process.env.NODEMAILER_PASSWORD!,
      },
    };

    const transporter = createTransport(transporterSettings);

    const token = sign(
      { userId: user.id, lastPasswordChange: user.lastPasswordChange },
      process.env.PASSWORD_RESET_SECRET!,
      {
        expiresIn: 900000, // 15 mins
      }
    );

    const resetPasswordUrl =
      process.env.NODE_ENV === 'production'
        ? `https://envenv.com/auth/resetPassword?token=${token}`
        : `http://localhost:8080/auth/resetPassword?token=${token}`;

    await transporter.sendMail({
      from: 'Envenv <noreply@envenv.com>',
      to: email,
      subject: 'Reset your envenv password',
      html: `
        <div style="font-family: Tahoma">
          <div style="max-width: 800px; width: 100%; margin: 0 auto;  padding: 30px 0;">
            <h1 style="font-size: 22px">Hi ${user.username},</h1>
            <p style="margin-bottom: 30px; color: #565656">You recently requested to reset your password for your Envenv account. Click the button below to reset it.</p>
            <a href="${resetPasswordUrl}" style="padding: 12px; border: none; background-color: #1890FF; cursor: pointer; color: #fff; border-radius: 5px; text-decoration: none;">Reset your password</a>
            <p style="margin-top: 30px; margin-bottom: 30px; color: #565656">If you did not request a password reset, please ignore this email. This password reset is only valid for 15 minutes.</p>
            <hr>
            <p style="margin-top: 30px; margin-bottom: 30px; color: #565656; font-size: 15px">If you're having trouble clicking the password reset button, copy and paste the URL below into your web browser.</p>
            <a style="color: #1890ff; display: block; max-width: 800px; overflow-wrap: break-word;" href="${resetPasswordUrl}">${resetPasswordUrl}</a>
          </div>
          <footer style="text-align: center; background-color: #f9f9f9; position: absolute; bottom: 0; left: 0; width: 100%; height: 200px; line-height: 200px">
            <p style="margin: 0">&copy; ${new Date().getFullYear()} Envenv. All Rights Reserved.</p>
          </footer>  
        </div>      
      `,
    });

    return {
      __typename: 'EmailMayHaveBeenSent',
      message:
        'If the email you provided was associated to an account, we have sent an email with the instructions to reset your password!',
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return {
        __typename: 'InvalidDataFormat',
        message: error.message,
      };
    }

    if (error instanceof ApolloError) {
      throw error;
    }

    throw new ApolloError(
      `Something went wrong on our side, we're working on it!`,
      '500',
      {
        errorCode: 'server_error',
      }
    );
  }
};

export default requestPasswordResetEmail;
