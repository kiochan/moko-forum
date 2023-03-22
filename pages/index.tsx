import Layout from "../components/view/Layout";
import TopicCard from "../components/widget/TopicCard";


const topics = [
    {
        author: 'Moko',
        id: '1',
        title: '锄大地',
        lastReply: {
            author: '尕牙',
            content: '富矿不是锄完了吗？'
        }
    },
    {
        author: '小香肠',
        id: '0',
        title: '吃货委员会',
        lastReply: {
            author: '糯米',
            content: '[图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片][图片]'
        }
    },
    {
        author: '小吉祥伞王',
        id: '2',
        title: '苦力协会',
        lastReply: {
            author: 'Moko',
            content: '不会还有人没下班吧？'
        }
    },
]

export default function App() {
    return <Layout>
        {topics.map((topic) => (<TopicCard key={topic.id} {...topic} />))}
    </Layout >
}