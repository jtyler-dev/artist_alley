import mailgunClient from "./MailgunClient";
import { render } from "@react-email/render";
import { EmailTypes } from "./EmailTypes";
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || "";

export async function sendEmail(
  emailType: EmailTypes, // doesnt do anything, mainly for debugging
  email: string,
  subject: string,
  template: React.ReactElement,
  fallbackMessage?: string
) {
  if (process.env.NODE_ENV === "production") {
    const html = await render(template, {
      pretty: true,
    });

    const text = await render(template, {
      plainText: true,
    });

    mailgunClient.messages
      .create(MAILGUN_DOMAIN, {
        from: `ArtistAlle.moe <norelpy@${MAILGUN_DOMAIN}>`,
        to: [email],
        subject: subject,
        text,
        html,
      })
      .catch((err) => {
        console.log(`-------Error sending ${emailType} email: -------`);
        console.log(err);
      });
  } else {
    console.log(`----- ${emailType} Email not sent in development mode. -----`);
    console.log(`fallbackMessage: ${fallbackMessage}`);
    console.log(`-----`);
  }
}
