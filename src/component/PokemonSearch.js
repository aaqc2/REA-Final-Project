import { useEffect, useState } from 'react'
import { useParams, useNavigate, Outlet } from 'react-router-dom'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export function PokemonSearch() {
    const params = useParams()
    const [pokemonList, setPokemonList] = useState([])
    const [query, setQuery] = useState(params.queryText ? params.queryText : '')
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log('fetch pokemon list')
        const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154'
        const fetchPokemonList = () => {
            return fetch(url).then((response) => {
                if(response.ok) {
                    response.json().then((data) => {
                        setPokemonList(data.results)
                    })
                } else {
                    console.log('response not ok')
                }
            })
        } 
        fetchPokemonList()
    },[])

    const handleOpen = () => {query.length > 0 && setOpen(true)};
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()

    const onQueryChange = (event,value) => {
        setQuery(value)
        setOpen(value.length > 0 ? true : false)
    }

    const handleSubmit = (value) => {
        navigate(`/search/${value}`)
    }
    
    return <div>
        <Autocomplete
            size='small'
            freeSolo
            disableClearable
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            options={pokemonList.filter(pokemon => query.length > 0 && pokemon.name.startsWith(query)).map((pokemon) => pokemon.name).sort()}
            renderOption={(props, option) => (
                <li key={option} {...props}>
                    <Typography {...props} style={{fontFamily: 'Silkscreen', fontSize: 12}}>{option}</Typography>
                </li>
                )}
            onInputChange={(event,value) => onQueryChange(event,value)}
            onChange={(event,value) => handleSubmit(value)}
            inputValue={query}
            renderInput={(params) => (
                <TextField
                 {...params}
                label={<Typography style={{fontFamily: 'Silkscreen'}}>Search</Typography>}
                InputProps={{
                ...params.InputProps,
                type: 'search',
                style: {fontFamily: 'Silkscreen'}    
                }}
            />
            )}
        />
        <Outlet />
    </div> 
 } export default PokemonSearch