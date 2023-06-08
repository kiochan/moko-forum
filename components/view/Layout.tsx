import Container from "./Container";
import Navbar from "../widget/Navbar"

interface LayoutProps {
    title: string
    children: React.ReactNode
    //leftRightConer: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => (
    <Container>
        <Navbar title={props.title} />
        {props.children}
    </Container>
);

export default Layout