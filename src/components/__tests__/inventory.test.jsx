import React from 'react';
import Inventory from '../Inventory/Inventory.jsx'
import {createRoot} from 'react-dom/client';

it('renders correctly', async() => {
    const div = document.createElement('div');
    const root = createRoot(div)
    root.render(
<div>
    <Inventory/>
</div>)
})
