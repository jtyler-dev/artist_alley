import formData from "form-data";
import Mailgun from "mailgun.js";
import { IMailgunClient } from "mailgun.js/Interfaces";

const mailgun = new Mailgun(formData);
const mailgunClientSingleton = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
});

declare const globalThis: {
  mailgunClient: IMailgunClient;
} & typeof global;

const mailgunClient = globalThis.mailgunClient ?? mailgunClientSingleton;

export default mailgunClient;

if (process.env.NODE_ENV !== "production")
  globalThis.mailgunClient = mailgunClient;
