import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Text, Card, Row, User } from "@nextui-org/react";

interface Props {
  article: any;
}

const CardArticle: NextPage<Props> = (props: any) => {
  const router = useRouter();
  const { article } = props;
  function getDate() {
    // dd--mm--yyyy
    let time = Date.parse(article.timestamp);
    let date = new Date(time);
    return date.toDateString();
  }
  return (
    <Card
      isPressable
      css={{
        mb: "$5",
      }}
      onPress={() => router.push("/article/" + article._id)}
    >
      <Card.Body>
        <Row justify="center" align="center">
          <div style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
            <h3>{article.title}</h3>
          </div>
        </Row>
        <Row justify="center" align="center">
          <User src={article?.user_img} name={article?.user_name} size="md" />
          <Text b> | {getDate()}</Text>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CardArticle;
