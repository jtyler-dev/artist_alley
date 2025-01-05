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
import React from "react";

interface EmailVerficiationTemplateProps {
  userName: string;
  url: string;
}

export const EmailVerficiationTemplate = ({
  userName,
  url,
}: EmailVerficiationTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Please verify your email for ArtistAlley.moe</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {userName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We just need to verify your email address before you can access
              ArtistAlley.moe.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              If you did not request a password reset, please ignore this email.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Verify your email address by clicking the button below:
            </Text>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              href={url}
            >
              Verify your email
            </Button>
            <Text className="text-black text-[14px] leading-[24px]">
              If you&apos;re having trouble clicking the &quot;Verify your
              email&quot; button, copy and paste the URL below into your web
              browser:
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">{url}</Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Thanks, <br />
              The ArtistAlley.moe Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailVerficiationTemplate;
