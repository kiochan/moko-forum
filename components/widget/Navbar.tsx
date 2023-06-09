import { Navbar as NextUINavBar, Button, Link, Text } from "@nextui-org/react";
import NextLink from 'next/link'
import Logo from "./Logo";
import { createContext, useState } from 'react';


export interface NavbarProps {
    title?: string
    returnButtonName?: string
    returnTo?: string
}

export default function Navbar(props: NavbarProps) {
    const showLoginButton = false

    return (
        <NextUINavBar isCompact isBordered variant="sticky" maxWidth="fluid">
            <NextLink href='/'>
                <NextUINavBar.Brand>
                    {props.returnButtonName ? (
                        <Button shadow color="primary" href={props.returnTo}>
                            {props.returnButtonName}
                        </Button>
                    ) : (
                        <>
                            <Logo />
                            <Text b color="inherit" hideIn="xs">
                                forom
                            </Text>
                        </>
                    )}
                </NextUINavBar.Brand>

            </NextLink>
            {
                props.title ? (
                    <NextUINavBar.Content variant="underline">
                        <Text h1 size={24}>{props.title}</Text>
                    </NextUINavBar.Content>
                ) : null
            }<NextUINavBar.Content>
                {showLoginButton ? <>
                    <NextUINavBar.Link color="inherit" href="#">
                        Login
                    </NextUINavBar.Link>
                    <NextUINavBar.Item>
                        <Button auto flat as={Link} href="#">
                            Sign Up
                        </Button>
                    </NextUINavBar.Item>
                </> : null}
            </NextUINavBar.Content>
        </NextUINavBar >
    )
}