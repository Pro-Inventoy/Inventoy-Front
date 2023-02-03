import { useItems } from "../../state/hooks/inventory.js";
import { useOrders } from "../../state/hooks/order.js";
import Grid from "./Grid.jsx";

export default function OrderList() {
  const { orders } = useOrders();
  const { items } = useItems();
  if (!orders) return null;

  return (
    <span>
      <Grid orders={orders} items={items}/>
    </span>
  );
}
