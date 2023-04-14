import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../../components/view/Layout";
import ReplyCard from "../../components/widget/ReplyCard";
import { Reply } from "../../types/Reply";
import { Topic } from "../../types/Topic";
import axios from "axios";
import { useRouter } from 'next/router'
import ReplyInput from "../../components/widget/ReplyInput";
import { styled } from "@nextui-org/react";

const ScrollDiv = styled("div", {
    overflowY: 'scroll',
});

export default function TopicPage() {
    const [replys, setReplys] = useState<Reply[]>([])
    const [title, setTitle] = useState<string>('')
    const [lastReplyTime, setLastReplyTime] = useState<number>(0)
    const router = useRouter()
    const scrollRef = useRef<HTMLDivElement>(null)

    const id = router.query.topic_id

    const uploadReply = useCallback((author: string, content: string) => {
        axios.post('/api/topic', { author, content, id }).then((res) => {
            setLastReplyTime(Date.now())
        })
    }, [id])

    useEffect(() => {
        const timer = setInterval(() => {
            setLastReplyTime(Date.now())
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        axios.get('/api/topic').then((res) => {
            const topics = res.data as Topic[]
            const crtTopic = topics.find(topic => {
                return topic.id === id
            })
            if (crtTopic) {
                setTitle(crtTopic.title)
                setReplys(crtTopic.replys)
                scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight
            }
        })
    }, [id, lastReplyTime])

    return <Layout title={title}>
        <ScrollDiv ref={scrollRef}>
            {replys.map((reply, index) => {
                return <ReplyCard key={index} {...reply} />
            })}
        </ScrollDiv>
        <ReplyInput onSubmit={uploadReply}></ReplyInput>
    </Layout >
}