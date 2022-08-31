import { React, useEffect, useRef } from 'react';
import { DataGrid, GridToolbar, GridCellEditStopReasons } from '@mui/x-data-grid';
import { getNameOfCategory, updateQuantity } from '../../state/services/inventory-service';
import { useItems } from '../../state/hooks/inventory';
import { addTransaction } from '../../state/services/transaction-service';
import { getUser } from '../../state/services/user-service';
import client from '../../state/services/client';
import { RealtimeClient } from '@supabase/supabase-js';
export default function Grid() {
  const items = useItems();
  const inventory = items.map(item => ({
      "id": item.id,
      "itemname": item.itemname,
      "quantity": item.quantity,
      "cost": item.cost,
      "category_name": item.Categories.category_name,
    }
  ))
  const ref = useRef({
    subscription: null
});

useEffect(() => {
  if (!ref.current.subscription) {
  const REALTIME_URL = process.env.REALTIME_URL || 'ws://localhost:3000/socket' 
  const socket = new RealtimeClient(REALTIME_URL)
  socket.connect()
  ref.current.subscription = client
    .from('Inventory')
    .on("*", async (payload) => {
      // it just doesn't go here at all! no idea why. subscription closes right as i start it.
      //i WOULD make the table update with new info as the table changes.
      // const userName = await (await getNameOfCategory(payload.new.categoryid)).data.category_name;
    })
    .subscribe((status,e)=>{console.log(status,e)})
}
}, []);
  
  const columns =  [
    { field: 'id', headerName: 'Item ID', width: 60 },
    { field: 'itemname', headerName: 'Item', width: 250 },
    { field: 'cost', headerName: 'Cost (per item)', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 150, editable: true },
    { field: 'category_name', headerName: 'Category', width: 150 },
  ];


return (
    <div style={{ height: 660, width: 'auto' }}>
    <DataGrid
        disableSelectionOnClick
        rows={inventory}
        columns={columns}
        components={{
        Toolbar: GridToolbar,
        }}
        onCellEditStop={async(params, event) => {
            if (params.reason === GridCellEditStopReasons.cellFocusOut) {
              event.defaultMuiPrevented = true;
            }
            await updateQuantity(event.target.value, Number(params.id))
            await addTransaction({icon: 'https://img.icons8.com/ios-filled/344/shipping-center.png', user_id: getUser().id, content:' set ' + params.row.itemname + ' stock to ' + event.target.value})
          }}
    />
    </div>
);
}