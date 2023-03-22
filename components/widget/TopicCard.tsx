import { Card, Text, Grid, Avatar } from "@nextui-org/react/";
import Link from "next/link";

export interface TopicCardProps {
    author: string
    id: string;
    title: string;
    lastReply: {
        author: string;
        content: string;
    };
}

const TopicCard = (props: TopicCardProps) => (
    <Link href={`/topic/${props.id}`}>
        <Card css={{ p: "$6" }}>
            <Card.Body>
                <Grid.Container css={{ pl: "$6" }}>
                    <Grid xs={2}>
                        <Avatar
                            squared
                            size="xl"
                            text={props.author} />
                    </Grid>
                    <Grid xs={10}>
                        <Grid.Container css={{ pl: "$6" }}>
                            <Grid xs={12}>
                                <Text h4 css={{ lineHeight: "$xs" }}>
                                    {props.title}
                                </Text>
                            </Grid>
                            <Grid xs={12}>
                                <Text css={{ color: "$accents8" }}>
                                    {`${props.lastReply.author}: ${props.lastReply.content}`}
                                </Text>
                            </Grid>
                        </Grid.Container>
                    </Grid>
                </Grid.Container>
            </Card.Body>
        </Card >
    </Link>
)

export default TopicCard
