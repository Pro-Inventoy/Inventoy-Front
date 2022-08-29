import { useItems } from "../../state/hooks/inventory.js";
import InventoryItem from "./InventoryItem.jsx";
import Grid from './Grid.jsx';
export default function InventoryList() {
  const { items } = useItems();
  if (!items) return null;

  return (
    <span>
      <Grid/>
      <ul>
        {items.map((inventory) => (
          <InventoryItem key={inventory.inventoryId} item={inventory}/>
        ))}
      </ul>
    </span>
  );
}
