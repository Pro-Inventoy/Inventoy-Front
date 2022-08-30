import * as React from 'react';
import { DataGrid, GridToolbar, GridCellEditStopReasons } from '@mui/x-data-grid';
import { updateOrder } from '../../state/services/order-service';
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
    <div style={{ height: 700, width: 1300 }}>
    <DataGrid
        disableSelectionOnClick
        rows={updatedOrders}
        columns={columns}
        components={{
        Toolbar: GridToolbar,
        }}
        onCellEditStop={async(params, event) => {
            if (params.reason === GridCellEditStopReasons.cellFocusOut) {
              event.defaultMuiPrevented = true;
            }
            await updateOrder(event.target.value, Number(params.id))
          }}
    />
    </div>
);
}