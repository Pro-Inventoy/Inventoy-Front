import { React } from 'react';
import { DataGrid, GridToolbar, GridCellEditStopReasons } from '@mui/x-data-grid';
import { updateQuantity } from '../../state/services/inventory-service';
import { addTransaction } from '../../state/services/transaction-service';
import { getUser } from '../../state/services/user-service';

export default function Grid({items}) {

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
        rows={items}
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