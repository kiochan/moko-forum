import { Button, FormElement, Input, Textarea, Spacer, styled } from "@nextui-org/react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

const SubmitDiv = styled("div", {
    display: 'flex',
    flexDirection: 'row-reverse',
});

export interface ReplyInputProps {
    onSubmit: (author: string, content: string) => void
}

export default function ReplyInput(props: ReplyInputProps) {
    const [author, setAuthor] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const authorRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const author = localStorage.getItem('author')
        console.log(author)
        if (author) {
            authorRef.current!.value = author
            setAuthor(author)
        }
    }, [setAuthor])

    const setAuthorInput = useCallback((e: ChangeEvent<FormElement>) => {
        const name: string = e.target.value
        localStorage.setItem('author', name)
        setAuthor(name)
    }, [setAuthor])

    const setContentInput = useCallback((e: ChangeEvent<FormElement>) => {
        setContent(e.target.value)
    }, [setAuthor])

    const onSubmit = useCallback(() => {
        if (author && content) {
            props.onSubmit(author, content)
        }
        setContent('')
        contentRef.current!.value = ''
    }, [author, content, props.onSubmit])

    const inputIsEmpty = !author || !content

    return <div>
        <Spacer y={0.5} />
        <Textarea placeholder="内容" aria-label="reply-content" ref={contentRef} onChange={setContentInput} width="100%" minRows={1} />
        <Spacer y={0.5} />
        <SubmitDiv>
            <Button onClick={onSubmit} aria-label="reply-submit" disabled={inputIsEmpty}>回复</Button>
            <Input placeholder="名字" aria-label="reply-author" ref={authorRef} onChange={setAuthorInput} />
        </SubmitDiv>
        <Spacer y={0.5} />
    </div>
}