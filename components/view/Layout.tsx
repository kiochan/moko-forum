import Box from "./Box";
import Navbar from "../widget/Navbar"

interface LayoutProps {
    title: string
    children: React.ReactNode
}

const Layout = (props: LayoutProps) => (
    <Box
        css={{
            maxW: "100%"
        }}
    >
        <Navbar title={props.title} />
        {props.children}
    </Box>
);

export default Layout