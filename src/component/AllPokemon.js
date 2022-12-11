import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

export function AllPokemon() {
    const [pokemonList, setPokemonList] = useState([])
    const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
    const [nextUrl, setNextUrl] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log('fetch pokemon list')
        setIsLoading(true)   
       
        fetch(currentUrl).then((response) => {    
            if(response.ok) {
                response.json().then((data) => {
                    setPokemonList(data.results) 
                    setNextUrl(data.next)
                    setPrevUrl(data.previous)
                    
                })
            } else {
                console.log('response not ok')
            } 
        })  
    },[currentUrl])

    function GetPokemonInfo() {
        
        setIsLoading(false)
        return pokemonList.map((item) => (
             <Grid key={item.name} item md={3} sx={{width: 'auto', height: '100%'}}>
                <Card sx={{border: 0, borderRadius: 6, transition: '0.2s', '&:hover': {transform: 'scale(1.1)', boxShadow: '2px 4px 0 4px #cc0000, 4px 8px 0 8px #ffde00, 8px 10px 0 12px #3b4cca'}}} elevation={2}>
                    <CardActionArea component={Link} to={`/pokemon/${item.name}`}>   
                    <CardMedia
                        component='img'
                        height='100%'
                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.url.split('/')[6]}.png`}
                        alt={item.name} />
                    <CardHeader style={{backgroundColor: '#354065'}}>
                        <Typography gutterBottom variant='p' fontFamily='Silkscreen' fontSize='100%' color='#c2492f' style={{wordWrap: 'break-word', margin: 'auto'}}>
                        {item.name}
                        </Typography>
                    </CardHeader>
                    </CardActionArea>
                </Card> 
            </Grid>
       ))   
    }
    
      
    return <div>
        <Grid container rowSpacing={4} spacing={4} sx={{width: '100%', height: '100%'}} p={8} >
            <GetPokemonInfo />
        </Grid>

        <AppBar position='fixed' color='transparent' sx={{top: '93%', bottom: 0}}>
        <Toolbar>
          <IconButton onClick={() => setCurrentUrl(prevUrl)}  style={{marginLeft: '20%', display: !prevUrl ? 'none' : null}}>
            <img src='/left_arrow.png' alt='left_arrow' style={{width: 20, marginBottom: 15}}/>
          </IconButton>
          <Box sx={{ flexGrow: 20, marginBottom: 75 }} >{<span style={{fontFamily: 'Silkscreen', display: isLoading ? null : 'none'}}>Loading... <img src='/pikachu-running.gif' alt='loading...' style={{width: '5%'}}/></span>}</Box>
          <IconButton onClick={() => setCurrentUrl(nextUrl)} style={{display: !nextUrl ? 'none' : null}}>
            <img src='/right_arrow.png' alt='right_arrow' style={{width: 20, marginBottom: 15}}/>
          </IconButton>
        </Toolbar>
      </AppBar>    
    </div>

} export default AllPokemon