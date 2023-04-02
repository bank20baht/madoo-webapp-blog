import React, { useEffect, useState } from "react";
import { Textarea, Button, Text, Grid } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import axios from "axios";


const apiURL = 'http://localhost:5000/api/addArticle'

const Home = () => {
    const router = useRouter();
    const { data: session } = useSession()
    const [articles, setArticles] = useState();    
    const initalState = {
        title: "",
        content: "",
    }

    const [articleData, setArticleData] = useState(initalState)

    const handleChange = (e: any) => {
        setArticleData({...articleData, [e.target.name] : e.target.value})
    }

    //console.log(articleData)
    function postArticle() {
        axios.post(apiURL, {
            title: articleData.title,
            content: articleData.content,
            user_email: session?.user?.email,
            user_name: session?.user?.name,
            user_img: session?.user?.image
        }).then((resspone) => {
            setArticles(resspone.data)
        })
        setArticleData(initalState)
        router.push("/")
    }
    return (
        <Grid.Container gap={1}>
            <Text h3>Title</Text>
            <Grid xs={12}>
                <Textarea 
                    name="title" 
                    aria-label="title"
                    placeholder="Article Title"
                    fullWidth={true}
                    rows={1}
                    size="xl"
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
                    rows={6}
                    size="xl"
                    onChange={handleChange}
                />
            </Grid>
            <Grid xs={12}>
                <Text>Posting as {session?.user?.name}</Text>
            </Grid>
                <Button onPress={postArticle}>Create Article</Button>
        </Grid.Container>
        
    );
};
  
export default Home;