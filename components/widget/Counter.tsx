import { useState } from "react"

interface CounterProps {
    initValue: number
}

// 函数组件
export default function Counter(props: CounterProps): JSX.Element {
    // useState的返回值是一个数组
    // 第一个元素是状态值，第二个元素是修改状态值的函数
    const [value, setValue] = useState(props.initValue)

    // 事件处理函数
    function add(howMuch: number) {
        return () => setValue(value + howMuch)
    }

    // 返回一个React元素
    return <div>
        <button onClick={add(-5)}>--</button>
        <button onClick={add(-1)}>-</button>
        <span> {value} </span>
        <button onClick={add(1)}>+</button>
        <button onClick={add(5)}>++</button>
    </div>
}