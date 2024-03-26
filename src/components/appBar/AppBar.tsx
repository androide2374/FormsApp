import { AppBar as AppBarMaterial, Button, Toolbar, Typography } from '@mui/material'

interface AppBarProps {
  title: string
  share?: boolean
  onShare?: () => void
}

export const AppBar = (props: AppBarProps) => {
  // const { title, share, onShare } = props
  return (<AppBarMaterial position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Su logo Aqui
          </Typography>
          {

          }
          <Button color="inherit">Compartir</Button>
        </Toolbar>
      </AppBarMaterial>)
}
