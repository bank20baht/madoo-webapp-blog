import React, { useEffect, useState } from "react";
import { Textarea, Button, Text, Grid } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

const apiURL = "http://localhost:5000/api/article/";

const Home = () => {
  const { data: session } = useSession();
  const [articles, setArticles] = useState();

  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
  });
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id != null) {
      axios.get(apiURL + id).then((response) => {
        const initalState = {
          title: response.data.title,
          content: response.data.content,
        };
        setArticleData(initalState);
        //console.log(initalState);
      });
    }
  }, [id]);

  const handleChange = (e: any) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
  };

  //console.log(articleData);
  async function editArticle() {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/update/article",
        {
          _id: id,
          title: articleData.title,
          content: articleData.content,
          user_email: session?.user?.email,
          user_name: session?.user?.name,
          user_img: session?.user?.image,
        }
      );
      setArticles(response.data);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Grid.Container gap={2.5}>
      <Text h3>Title</Text>
      <Grid xs={12}>
        <Textarea
          maxLength={95}
          name="title"
          aria-label="title"
          placeholder="Article Title"
          fullWidth={true}
          rows={1}
          size="xl"
          value={articleData.title}
          onChange={handleChange}
        />
      </Grid>
      <Text h3>Article Text</Text>
      <Grid xs={12}>
        <Textarea
          name="content"
          aria-label="content"
          placeholder="Article Text"
          fullWidth={true}
          rows={18}
          size="xl"
          value={articleData.content}
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12}>
        <Text>Posting as {session?.user?.name}</Text>
      </Grid>
      <Button onPress={editArticle}>Update</Button>
    </Grid.Container>
  );
};

export default Home;
