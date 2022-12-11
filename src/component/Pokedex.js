import { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route, NavLink } from 'react-router-dom'
import LandingPage from './LandingPage.js'
import PokemonSearch from './PokemonSearch.js'
import AllPokemon from './AllPokemon.js'
import PokemonDetails from './PokemonDetails'

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

function Pokedex() {
    const drawerWidth = '20%';
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    const navigation = [
        {
          label: 'Home',
          path: '/',
        },
        {
          label: 'Search',
          path: '/search',
        },
        {
            label: 'All Pokemon',
            path: '/pokemon',
        }
    ]

    useEffect(() => {
        setCurrentPath(window.location.pathname)
    }, [])

    return <BrowserRouter>
      <Box sx={{display:'flex'}}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: '#ff8400'
            },
          }}
          variant="permanent"
          anchor="left"
          PaperProps={{elevation: 14}}
        >
          <Toolbar >
            <Typography
              variant='h6'
              noWrap
              component={NavLink}
              onClick={() => setCurrentPath('/')}
              to={'/'}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Silkscreen',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#007bff',
                textDecoration: 'none',
              }}
            >
              POKé<img src='/pokedex.gif' alt='pokedex' style={{width: 30, align: 'center', paddingRight: 3}} /> EX   
            </Typography>
           </Toolbar> 
          <Divider />
          <List>
            {navigation.map((item, i) => (<ListItem key={i} disablePadding>
                <ListItemButton component={NavLink} key={i} to={item.path} onClick={() => setCurrentPath(item.path)} style={({ isActive }) => ({color: isActive ? '#f3b941' : null })}>
                <ListItemIcon style={{display: 'inline-block', width: '10%', minWidth: '10%'}}>
                    {currentPath === item.path 
                    ? <img src='/opened_pokeball.png' alt='opened_pokeball' width={'75%'} style={{display: 'block'}}/>
                    : <img src='/closed_pokeball.png' alt='closed_pokeball' width={'75%'} style={{display: 'block'}}/> }
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ style: {fontFamily: 'Silkscreen', color: '#007bff'} }} primary={item.label} />
                </ListItemButton>
            </ListItem>))}
        </List>         
        </Drawer>
        <Box component="main" sx={{flexGrow: 1, bgcolor: 'common.default', p: 3}}>
            <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/search" element={<PokemonSearch />}>
                    <Route path=":queryText"element={<PokemonDetails />} />
                </Route>
                <Route path="/pokemon" element={<AllPokemon />}></Route>
                <Route path="/pokemon/:queryText" element={<PokemonDetails />}></Route>
                <Route path="*" element={<h1>Page not found</h1>}/>
            </Routes>
        </Box>
      </Box>
      </BrowserRouter>
} 
 export default Pokedex    