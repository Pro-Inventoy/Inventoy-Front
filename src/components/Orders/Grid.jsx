import { React, useEffect, useRef } from 'react';
import { DataGrid, GridToolbar, GridCellEditStopReasons } from '@mui/x-data-grid';
import { removeOrder, updateOrder } from '../../state/services/order-service';
import { addTransaction } from '../../state/services/transaction-service';
import { getNameOfUser, getUser } from '../../state/services/user-service';
import { RealtimeClient } from '@supabase/supabase-js';
import client from '../../state/services/client';
import { getNameOfItem } from '../../state/services/inventory-service';
export default function Grid( {orders}) {
    const updatedOrders = orders.map(order => ({
        "id": order.id,
        "date": order.date,
        "label": order.label,
        "itemname": order.Inventory.itemname,
        "orderquantity": order.orderquantity,
        "remaining": order.orderquantity - order.completed,
        "employee": order.Users.empname,
        "completed": 0,
        "completevalue": order.completed,
      }
    ))
    const ref = useRef({
      subscription: null,
      orders: updatedOrders,
  });
  
  useEffect(() => {
    if (!ref.current.subscription) {
    const REALTIME_URL = process.env.REALTIME_URL || 'ws://localhost:3000/socket' 
    const socket = new RealtimeClient(REALTIME_URL)
    socket.connect()
    ref.current.subscription = client
      .from('Orders')
      .on("*", async (payload) => {
        const remaining = payload.new.orderquantity - payload.new.completed;
        const employee = await getNameOfUser(payload.new.user_id);
        const itemname = await getNameOfItem(payload.new.productId);
        const newItem = {
          id: payload.new.id,
          date:payload.new.date,
          label:payload.new.label,
          itemname: itemname,
          orderquantity: payload.new.orderquantity,
          remaining: remaining,
          employee: employee,
          completed: 0,
          completevalue: payload.new.completed
        }   
        console.log('the new item', newItem);
        ref.current.orders = [...orders, newItem]
        console.log('the current orders', ref.current.orders);
        // rerender please
      })
      .subscribe((status,e)=>{console.log(status,e)})
  }
  }, [orders, ref.current.orders]);
    
  const columns =  [
    { field: 'id', headerName: 'Order ID', width: 60 },
    { field: 'date', headerName: 'Placed', width: 100 },
    { field: 'label', headerName: 'Label', width: 150 },
    { field: 'itemname', headerName: 'Item Name', width: 150 },
    { field: 'orderquantity', headerName: 'Total Items', width: 150},
    { field: 'remaining', headerName: 'Items Remaining', width: 150,},
    { field: 'completed', headerName: 'Completed Items', width: 150, editable: true },
    { field: 'employee', headerName: 'Employee', width: 150 },
  ];
  
return (
    <div style={{ height: 700, width: 'auto'}}>
    <DataGrid
        disableSelectionOnClick
        rows={ref.current.orders}
        columns={columns}
        components={{
        Toolbar: GridToolbar,
        }}
        onCellEditStop={async(params, event) => {
            if (params.reason === GridCellEditStopReasons.cellFocusOut) {
              event.defaultMuiPrevented = true;
            }
            await updateOrder(event.target.value, Number(params.id))
            if (Number(event.target.value) === params.row.remaining) {
              await removeOrder(params.row.id);
              await addTransaction({icon: 'https://img.icons8.com/ios-filled/344/successful-delivery.png', user_id: getUser().id, content:' finished order #' + params.row.id + ' of ' +params.row.itemname});
            } else {
              await addTransaction({icon: 'https://img.icons8.com/ios-filled/344/holding-box.png', user_id: getUser().id, content:' completed '+ event.target.value + ' items of ' + params.row.itemname});
            }
          }}
    />
    </div>
);
}