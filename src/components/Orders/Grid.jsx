import { React } from 'react';
import { DataGrid, GridToolbar, GridCellEditStopReasons } from '@mui/x-data-grid';
import { removeOrder, updateOrder } from '../../state/services/order-service';
import { addTransaction } from '../../state/services/transaction-service';
import { getUser } from '../../state/services/user-service';
export default function Grid( {orders}) {

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
        rows={orders}
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