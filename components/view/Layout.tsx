import Container from "./Container";
import Navbar from "../widget/Navbar"

interface LayoutProps {
    title: string
    returnButtonName?: string
    returnTo?: string
    children: React.ReactNode
    //leftRightConer: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => (
    <Container>
        <Navbar title={props.title} 
        returnButtonName={props.returnButtonName}
        returnTo={props.returnTo}
        />
        {props.children}
    </Container>
);

export default Layout