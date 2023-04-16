import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../components/view/Layout";
import TopicCard from "../components/widget/TopicCard";
import { TopicCard as TopicCardType } from "../types/TopicCard";
import { Topic } from "../types/Topic";
import axios from 'axios'
import ScrollDiv from "../components/view/ScrollDiv";
import ReplyInput from "../components/widget/ReplyInput";

export default function App() {
    const [topics, setTopics] = useState<TopicCardType[]>([])
    const scrollRef = useRef<HTMLDivElement>(null)
    const [lastReplyTime, setLastReplyTime] = useState<number>(0)

    const updateTopics = useCallback(() => {
        axios.get('/api/topic').then((res) => {
            const newTopics = res.data as Topic[]
            if (newTopics && newTopics.length !== topics.length) {
                const topicsData = newTopics.map<TopicCardType>(topic => ({
                    author: topic.author,
                    id: topic.id,
                    title: topic.title,
                    lastReply: {
                        author: topic.replys[0].author,
                        content: topic.replys[0].content,
                    }
                }))
                setTopics(topicsData)
                scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight
            }
        })
    }, [setTopics])

    useEffect(() => {
        updateTopics()
    }, [updateTopics])

    useEffect(() => {
        const timer = setInterval(() => {
            setLastReplyTime(Date.now())
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [setLastReplyTime])

    const uploadReply = useCallback((author: string, content: string, title?: string) => {
        axios.post('/api/topic', { author, content, title }).then((res) => {
            updateTopics()
        })
    }, [])

    return <Layout title="聊天室">
        <ScrollDiv ref={scrollRef}>
            {
                topics.map(
                    (topic) => (<TopicCard key={topic.id} {...topic} />)
                )
            }
        </ScrollDiv>
        <ReplyInput showTitle onSubmit={uploadReply} buttonName="创建新话题"></ReplyInput>
    </Layout >
}