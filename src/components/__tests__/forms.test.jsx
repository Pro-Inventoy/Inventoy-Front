import React from 'react';
import {createRoot} from 'react-dom/client';
import {InputControl, SelectControl, FormButton} from '../Forms/FormControl.jsx'

it('renders components', () =>{
const div = document.createElement('div');
const root = createRoot(div);
root.render(
<div>
    <FormButton/>
    <SelectControl/>
    <InputControl/>
</div>)
})