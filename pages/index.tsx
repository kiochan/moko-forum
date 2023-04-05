import { useEffect, useState } from "react";
import Layout from "../components/view/Layout";
import TopicCard from "../components/widget/TopicCard";
import { TopicCard as TopicCardType } from "../types/TopicCard";
import { Topic } from "../types/Topic";
import axios from 'axios'

export default function App() {
    const [topics, setTopics] = useState<TopicCardType[]>([])

    useEffect(() => {
        axios.get('/api/topic').then((res) => {
            const data = res.data as Topic[]
            const mapedTopic = data.map(topic => {
                return {
                    author: topic.author,
                    id: topic.id,
                    title: topic.title,
                    lastReply: topic.replys[topic.replys.length - 1],
                } as TopicCardType
            })
            setTopics(mapedTopic)
        })
    }, [])

    return <Layout title="Chat">
        {topics.map((topic) => (<TopicCard key={topic.id} {...topic} />))}
    </Layout>
}