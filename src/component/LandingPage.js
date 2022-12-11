import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export function LandingPage() {
    const [randNumber, setRandNumber] = useState(Math.floor(Math.random() * 803))
    const [pokemon, setPokemon] = useState({})
    const [userAnswer, setUserAnswer] = useState('')
    const [revealAnswer, setRevealAnswer] = useState(true)
    const [textColor, setTextColor] = useState('black')

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${randNumber}`
        fetch(url).then((response) => {
            if(response.ok){
                response.json().then((data) => {
                    console.log(data.name)
                    setPokemon(data)
                    setTextColor('black')
                    setRevealAnswer(false)
                })
            } else {
                console.log('failed to get response')
            }
        })
    },[randNumber]) 

    const handleOnClick = () => {
        if(userAnswer === pokemon.name) {
            setTextColor('#00aeac')
        } else {
            setTextColor('#f46d75')
        }

        setUserAnswer('')
        setRevealAnswer(true)
        setTimeout(function() {
            setRandNumber(Math.floor(Math.random() * 803))
          }, 600);
        
    }

    return  <div style={{width: '76%', height: '100%', position: 'fixed', fontFamily: 'Silkscreen', justifyContent: 'center'}}>
        <h1 style={{color: textColor}}>Who's That Pokemon</h1>
        { 
        pokemon?.name && 
        <div>
            <div style={{boxShadow: '10px 10px #d8d8d8', borderRadius: 5, marginLeft: '15%', width: '70%', height: 361.4, backgroundImage: 'url(./whos_that_pokemon.png)', backgroundSize: '100% 100%'}}>
                <img style={{float:'left', marginLeft: '10%', marginTop: '5%', width:'40%', filter: revealAnswer ? '' : 'brightness(0)'}} src={pokemon.sprites.front_default} alt='pokemon' />
            </div>
        
            <div style={{marginTop: 20}}>
                <TextField InputProps={{style: {fontFamily: 'Silkscreen'}}} 
                    size='small' 
                    style={{fontFamily: 'Silkscreen', borderColor: 'green'}} 
                    id='outlined-basic' 
                    label={<Typography style={{fontFamily: 'Silkscreen'}}>Who dat</Typography>} 
                    variant='outlined' 
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleOnClick()
                            e.preventDefault()
                        }
                    }}
                    value = {userAnswer} onChange={(event) => setUserAnswer(event.target.value.toLowerCase())}/>
                <Button color="secondary" onClick={handleOnClick} style={{fontFamily: 'Silkscreen'}}>Submit</Button>
                <p style={{display: revealAnswer ? '' : 'none' }}>It's {pokemon.name}</p>
            </div>
        </div>
        }
    </div>

} export default LandingPage