import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input, Button, Text, Grid, Link } from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";

const apiURL = "http://localhost:5000/login";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleGoogleLogin() {
    await signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  if (session) {
    router.push("/");
  }

  return (
    <>
      <Grid.Container gap={1} justify="center">
        <Text
          h1
          size={80}
          css={{
            textGradient: "45deg, $yellow600 -20%, $red600 100%",
          }}
          weight="bold"
        >
          Login
        </Text>
        <Grid xs={12} justify="center">
          <Button bordered color="primary" flat onClick={handleGoogleLogin}>
            Sign in with Google
          </Button>
        </Grid>
        <Grid xs={12} justify="center">
          <Text>Don't have an account yet?</Text>
          <Link href="https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp">.Register</Link>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Login;
