import { Navbar as NextUINavBar, Button, Link, Text } from "@nextui-org/react";
import Logo from "./Logo";

export interface NavbarProps {
    title?: string
}

export default function Navbar(props: NavbarProps) {
    return (
        <NextUINavBar isCompact isBordered variant="sticky">
            <NextUINavBar.Brand>
                <Logo />
                <Text b color="inherit" hideIn="xs">
                    forum
                </Text>
            </NextUINavBar.Brand>
            {
                props.title ? (
                    <NextUINavBar.Content variant="underline">
                        <Text h1 size={24}>{props.title}</Text>
                    </NextUINavBar.Content>
                ) : null
            }
            <NextUINavBar.Content>
                <NextUINavBar.Link color="inherit" href="#">
                    Login
                </NextUINavBar.Link>
                <NextUINavBar.Item>
                    <Button auto flat as={Link} href="#">
                        Sign Up
                    </Button>
                </NextUINavBar.Item>
            </NextUINavBar.Content>
        </NextUINavBar>
    )
}