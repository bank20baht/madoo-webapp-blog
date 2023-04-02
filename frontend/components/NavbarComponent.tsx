import { Navbar, Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const NavbarComponent = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Navbar isCompact variant="floating">
      <Navbar.Brand as={Link} href="/">
        <Text
          h3
          css={{
            textGradient: "45deg, $yellow600 -5%, $red600 100%",
          }}
          weight="bold"
        >
          MADOO.
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        {!session /*User doesnt exist*/ ? (
          <>
            <Navbar.Link href="/Login">
              <Button bordered color="error" auto>
                Login
              </Button>
            </Navbar.Link>
          </>
        ) : (
          /* User does exist */
          <>
            <Navbar.Item>
              <Navbar.Link href="/Write">
                <Button auto bordered color="error">
                  Write
                </Button>
              </Navbar.Link>
            </Navbar.Item>
            <Navbar.Item>
              <Button
                auto
                bordered
                color="error"
                onPress={() => {
                  router.push("/MyStory/" + session?.user?.name);
                }}
              >
                Hi, {session?.user?.name}
              </Button>
            </Navbar.Item>
            <Navbar.Item>
              <Button color="error" auto onPress={() => signOut()}>
                Sign Out
              </Button>
            </Navbar.Item>
          </>
        )}
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarComponent;
