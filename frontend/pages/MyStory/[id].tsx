import { Text, Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import CardArticle from "@/components/CardArticle";
import { useRouter } from "next/router";

export type ArticleData = {
  _id: string;
  title: string;
  content: string;
  user_email: string;
  timestamp: string;
  user_name: string;
  user_img: string;
};

const apiURL = "http://localhost:5000/api/user/";

const MyStory = () => {
  const [articles, setArticles] = useState<ArticleData[] | null>();
  const router = useRouter();
  const { id } = router.query;
  //console.log("id in Mystroty page => " + id);
  useEffect(() => {
    const getMyArticle = async () => {
      try {
        const response = await axios.get(apiURL + id);
        setArticles(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMyArticle();
  }, []);

  return (
    <>
      <Grid.Container gap={1} justify="center">
        <Text h1>My Article</Text>
      </Grid.Container>
      {articles
        ?.slice(0)
        .reverse()
        .map((article) => (
          <CardArticle article={article} key={article._id} />
        )) ?? <Text>No article found</Text>}
    </>
  );
};

export default MyStory;
