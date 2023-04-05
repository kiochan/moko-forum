import { useEffect, useRef, useState } from "react";
import Layout from "../../components/view/Layout";
import ReplyCard from "../../components/widget/ReplyCard";
import { Reply } from "../../types/Reply";
import { Topic } from "../../types/Topic";
import { TopicCard as TopicCardType } from "../../types/TopicCard";
import axios from "axios";
import { useRouter } from 'next/router'
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function App() {
    const [replys, setReplys] = useState<Reply[]>([])
    const [title, setTitle] = useState<string>('')
    const router = useRouter()
    const authorInput = useRef<HTMLInputElement>(null)
    const contentInput = useRef<HTMLInputElement>(null)

    const id = router.query.topic_id

    function uploadReply() {
        if (authorInput.current && contentInput.current) {
            const author = authorInput.current.value
            const content = contentInput.current.value
            console.log({ author, content, id })
            axios.post('/api/topic', { author, content, id }).then((res) => {
                location.reload();
            })
        }
    }

    useEffect(() => {
        axios.get('/api/topic').then((res) => {
            const topics = res.data as Topic[]
            const crtTopic = topics.find(topic => {
                return topic.id === id
            })
            console.log(topics)
            if (crtTopic) {
                setTitle(crtTopic.title)
                setReplys(crtTopic.replys)
            }
        })
    }, [id])

    return <Layout title={title}>
        {replys.map((reply, index) => {
            return <ReplyCard key={index} {...reply} />
        })}
        <div>
            <Input placeholder="名字" ref={authorInput} />
            <Input placeholder="内容" ref={contentInput} />
            <Button onClick={uploadReply}>回复</Button>
        </div>
    </Layout >
}