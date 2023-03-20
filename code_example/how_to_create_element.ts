/*
<div><p>hello</p></div>
*/

const p = document.createElement('p');
p.textContent = 'hello';

const div = document.createElement('div');
div.appendChild(p);

document.body.appendChild(div);

