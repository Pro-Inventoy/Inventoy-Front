import React from 'react'
import { IconButton, GroupsIcon, AccountBoxIcon, WarehouseIcon, PendingActionsIcon, HomeIcon } from '@mui/material'
import styles from './NavBar.css'

export default function NavBar() {
  return (
    <div className={styles.nav}>
     <IconButton color="primary" aria-label="upload picture" component="label">
          Home<HomeIcon />
     </IconButton>
     <IconButton color="primary" aria-label="upload picture" component="label">
          Orders<PendingActionsIcon />
     </IconButton>
     <IconButton color="primary" aria-label="upload picture" component="label">
          Inventory<WarehouseIcon />
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="label">
          Users
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="label">
             Profile<AccountBoxIcon />
        </IconButton>
    </div>
  )
}