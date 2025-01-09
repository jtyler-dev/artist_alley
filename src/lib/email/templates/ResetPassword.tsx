import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface PasswordResetTemplateProps {
  email: string;
  url: string;
  userName: string;
}

export const PasswordResetTemplate = ({
  email,
  url,
  userName,
}: PasswordResetTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Password Reset Request</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {userName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We received a request to reset the password for your account
              associated with {email}.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              If you did not request a password reset, please ignore this email.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              To reset your password, click the link below:
            </Text>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              href={url}
            >
              Reset your password
            </Button>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste the following link into your browser:
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">{url}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetTemplate;
