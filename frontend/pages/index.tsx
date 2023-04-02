import type { NextPage } from "next";
import { Text, Grid, Loading, Button, Col, Row } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import CardArticle from "@/components/CardArticle";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
export type ArticleData = {
  _id: string;
  title: string;
  content: string;
  user_email: string;
  timestamp: string;
  user_name: string;
  user_img: string;
};

const apiURL = "http://localhost:5000/api/articles";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [articles, setArticles] = useState<ArticleData[] | null>();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await axios.get(apiURL);
        setArticles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getArticle();
  }, []);

  return (
    <>
      <Grid.Container
        justify="center"
        css={{ height: "350px", backgroundColor: "#26292B" }}
      >
        <Grid xs={12} sm={6} alignItems="center">
          <Col css={{ width: "100%" }}>
            <Text
              weight={"bold"}
              size={70}
              css={{
                textAlign: "center",
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }}
            >
              Write everything if you want
            </Text>
            <Button
              size="md"
              color="error"
              auto
              css={{ width: "100%", marginTop: "10px" }}
              onPress={() => {
                !session ? (
                  router.push("/Login")
                ) :
                ( router.push("/Write"))
              }}
            >
              Write you Story
            </Button>
          </Col>
        </Grid>
      </Grid.Container>
      {articles && articles.length > 0 ? (
        articles
          .slice(0)
          .reverse()
          .map((article) => <CardArticle article={article} key={article._id} />)
      ) : (
        <Grid.Container justify="center">
          <Grid xs={1} alignItems="center">
            <Loading
              loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
            />
          </Grid>
          <Grid xs={1} alignItems="center">
            <Text>No Article Found, plase try again leater</Text>
          </Grid>
        </Grid.Container>
      )}
    </>
  );
};

export default Home;
