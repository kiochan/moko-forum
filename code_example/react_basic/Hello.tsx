import * as React from 'react'

export default function HelloComponent() {
    return <p className="hello_text">hello</p>
}

/*
对应的js/ts代码

export default function HelloComponent() {
    return React.createElement('p', {className: 'hello_text'}, 'hello')
}
*/