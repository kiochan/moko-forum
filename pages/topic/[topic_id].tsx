import Layout from "../../components/view/Layout";
import ReplyCard from "../../components/widget/ReplyCard";


const topics = [
    {
        author: '小香肠',
        content: '我没水晶了！'
    },
    {
        author: 'Moko',
        content: '@尕牙'
    },
    {
        author: '尕牙',
        content: '富矿不是锄完了吗？'
    },
]

const title = '锄大地'

export default function App() {
    return <Layout title={title}>
        {topics.map((reply, index) => (<ReplyCard key={index} {...reply} />))}
    </Layout >
}