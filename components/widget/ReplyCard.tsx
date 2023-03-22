import { Card, Text, Grid, Avatar } from "@nextui-org/react/";

export interface ReplyCardProps {
    author: string;
    content: string;
}

const TopicCard = (props: ReplyCardProps) => (
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
                            <Text css={{ color: "$accents8" }}>
                                {props.content}
                            </Text>
                        </Grid>
                    </Grid.Container>
                </Grid>
            </Grid.Container>
        </Card.Body>
    </Card >
)

export default TopicCard
