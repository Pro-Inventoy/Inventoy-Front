import React from 'react';
import App from '../App'
import {createRoot} from 'react-dom/client';

it('renders correctly', async() => {
    const div = document.createElement('div');
    const root = createRoot(div)
    root.render(
<div>
    <App/>
</div>)
})
