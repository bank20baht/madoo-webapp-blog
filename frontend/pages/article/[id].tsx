import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spacer, User, Button, Row } from "@nextui-org/react";
import axios from "axios";

import styles from "../../styles/Home.module.css";
import { useSession } from "next-auth/react";

const apiURL = "http://localhost:5000/api/article/";

export type ArticleData = {
  _id: string;
  title: string;
  content: string;
  user_email: string;
  timestamp: string;
  user_name: string;
  user_img: string;
};

const Article = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [article, setArticle] = useState<ArticleData | null>();
  const { id } = router.query;
  useEffect(() => {
    const getArticleById = async () => {
      try {
        const response = await axios.get(apiURL + id);
        setArticle(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      getArticleById();
    }
  }, [id]);
  const deleteArticle = async () => {
    await axios.delete(apiURL + id);
    setArticle(null);
    router.push("/");
  };
  return (
    <>
      <div style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
        <div
          className={styles.card}
          style={{
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            textAlign: "center",
            borderRadius: "20px",
            padding: "3vh"
          }}
        >
          <h2>{article?.title}</h2>
        </div>
        <Spacer y={1} />
        <div
          className={styles.card}
          style={{
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            padding: "3vh",
            borderRadius: "20px",
          }}
        >
          {article?.content}
        </div>
        <Spacer y={1} />
        <User src={article?.user_img} name={article?.user_name} size="md" />
        {session && article?.user_email == session?.user?.email ? (
          <Row>
            <Button
              size="sm"
              onPress={() => {
                router.push("/EditArticle/" + article?._id);
              }}
            >
              Edit
            </Button>
            <Spacer />
            <Button size="sm" color={"error"} onPress={deleteArticle}>
              DEL
            </Button>
          </Row>
        ) : null}
      </div>
    </>
  );
};

export default Article;
