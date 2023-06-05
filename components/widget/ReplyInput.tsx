import { Button, FormElement, Input, Textarea, Spacer, styled } from "@nextui-org/react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

const SubmitDiv = styled("div", {
    display: 'flex',
    flexDirection: 'row-reverse',
});

export interface ReplyInputProps {
    onSubmit: (author: string, content: string, title?: string) => void
    showTitle?: boolean
    buttonName?: string
}

export default function ReplyInput(props: ReplyInputProps) {
    const buttonName = props.buttonName ?? '回复'
    const showTitle = props.showTitle ?? false

    const [author, setAuthor] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const authorRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)
    const titleRef = useRef<HTMLTextAreaElement>(null)

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
    }, [setContent])

    const setTitleInput = useCallback((e: ChangeEvent<FormElement>) => {
        setTitle(e.target.value)
    }, [setTitle])

    const onSubmit = useCallback(() => {
        if (author && content) {
            props.onSubmit(author, content, title)
        }
        setContent('')
        setTitle('')
        contentRef.current!.value = ''
        titleRef.current!.value = ''
    }, [author, content, props.onSubmit])

    const inputIsEmpty = !author || !content || (showTitle && !title)

    return <div>
        <Spacer y={0.5} />
        {
            props.showTitle ?
                <>
                    <Input placeholder="主题" aria-label="topic-title" ref={titleRef} onChange={setTitleInput} />
                    <Spacer y={0.5} />
                </>
                : null
        }
        <Textarea placeholder="内容" aria-label="reply-content" ref={contentRef} onChange={setContentInput} width="100%" minRows={1} />
        <Spacer y={0.5} />
        <SubmitDiv>
            <Button onClick={onSubmit} aria-label="reply-submit" disabled={inputIsEmpty}>{buttonName}</Button>
            <Input placeholder="名字" aria-label="reply-author" ref={authorRef} onChange={setAuthorInput} />
        </SubmitDiv>
        <Spacer y={0.5} />
    </div>
}