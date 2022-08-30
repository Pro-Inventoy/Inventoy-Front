import { useItems } from "../../state/hooks/inventory.js";
import Grid from './Grid.jsx';
export default function InventoryList() {
  const { items } = useItems();
  if (!items) return null;

  return (
    <span>
      <Grid items={items}/>
    </span>
  );
}
