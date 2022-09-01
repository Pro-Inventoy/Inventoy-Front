import { useItems } from '../../state/hooks/inventory.js';
import Grid from './Grid.jsx';

export default function InventoryList() {
const { items } = useItems();

  return (
    <span>
      <Grid items={items}/>
    </span>
  );
}
