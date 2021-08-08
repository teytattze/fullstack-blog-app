import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import type { SendMailOptions } from 'nodemailer';
import { google } from 'googleapis';

const hbs = require('nodemailer-express-handlebars');

const OAuth2 = google.auth.OAuth2;

@Injectable()
export class MailService {
  async sendEmailVerification({
    id,
    username,
    email,
  }: {
    id: string;
    username: string;
    email: string;
  }) {
    const redirectLink = `http://localhost:3000/user/email-verification?id=${id}`;

    const template = {
      from: `\"${process.env.NODEMAILER_USER}\" <${process.env.NODEMAILER_MAIL}>`,
      to: email,
      subject: 'Email Verification',
      template: 'email-verification',
      context: {
        id,
        username,
        redirectLink,
      },
    };
    return await this.sendMail(template);
  }

  private async sendMail(options: SendMailOptions) {
    const transporter = await this.createTransport();
    transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extName: '.hbs',
          partialsDir: path.resolve(__dirname, 'templates'),
          defaultLayout: false,
        },
        viewPath: path.resolve(__dirname, 'templates'),
        extName: '.hbs',
      }),
    );
    await transporter.sendMail({ ...options });
  }

  private async createTransport() {
    const oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT,
      process.env.GOOGLE_SECRET,
      process.env.GOOGLE_REDIRECT_URL,
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.NODEMAILER_MAIL,
        clientId: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken as string,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
}
