import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

const ResultNotFoundStyle = styled('p')({
    position: 'absolute',
    fontFamily: 'Silkscreen', 
    fontSize: 70,
    marginLeft: '3%',
    marginTop: '12%',
    animation: 'mymove 4s infinite',
    '@keyframes mymove': {
        '0%': {transform: 'rotateY(0deg)'},
        '100%': {transform: 'rotateY(360deg)'}
    }
})

const BorderLinearProgress = styled(LinearProgress)(({ theme, name }) => ({
  height: 6,
  width: 100,
  borderRadius: 5,
  float: 'right',
  marginTop: 6,
  marginLeft: 3,
  marginRight: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'light',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: name === 'hp' ? '#4caf50' : name === 'attack' ? '#ff0000' : name === 'defense' ? '#0583d2' : name === 'special-attack' ? '#9300ff' : name === 'special-defense' ? '#095d55' : name === 'speed' ? '#ff6600' : '' ,
  }
}))

const colors = ['#e5725f', '#16403e']

export function PokemonDetails() {
    const param = useParams()
    const [details, setDetails] = useState({})
    const [species, setSpecies] = useState({})

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${param.queryText}`
        fetch(url).then((response) => {
            if(response.ok){
                response.json().then((data) => {
                    console.log(data)
                    setDetails(data)
                    if(data?.species) {
                        fetch(data.species.url).then((response) => {
                            if(response.ok) {
                                response.json().then((data) => {
                                    console.log(data)
                                    setSpecies(data)
                                })
                            } else {
                                setDetails({failed: true})
                                return
                            }
                        })
                    }
                })
            } else {
                setDetails({failed: true})
            }
        })
    },[param.queryText])  
      
    return <div style={{display: 'fixed', fontFamily: 'Silkscreen', margin: 15}}>
        {details?.failed 
            ?
                <div>
                    <ResultNotFoundStyle>Pokemon not found</ResultNotFoundStyle>
                    <img style={{width: '100%'}} src='/dancing_ditto.gif' alt='dancing_ditto'/>
                </div>
             : 
             details?.id && 
                <div>
                    <h3 style={{textAlign: 'left', marginTop: 1, width: '100%', height: '5%', marginBottom: 3}}>#{details.id < 10 ? '00' + details.id : details.id < 100 ? '0' + details.id : details.id}</h3>
                    <div style={{width: '100%', overflow: 'auto'}}>
                        <img style={{width: '25%', float: 'left'}}src={details?.sprites && details.sprites.other['official-artwork'].front_default} alt={details.id}/>
                        <div style={{display: 'inline-block', width: '70%', float: 'left', justifyContent: 'left',fontFamily: 'Silkscreen',textAlign: 'left', marginTop: '1%', marginLeft: '1%'}}>
                            <h2 style={{marginTop: 1, marginBottom: 2}}>{details.name}</h2>
                            <p style={{margin: 3}}>Height: {details.height/10}m</p>
                            <p style={{margin: 3}}>Weight: {details.weight/10}kg</p>
                            <p style={{margin: 3}}>Colour: {species?.color && species.color.name}</p>
                            <p style={{margin: 3}}>Shape: {species?.shape && species.shape.name}</p>
                            <p style={{margin: 3}}>Habitat: {species?.habitat && species.habitat.name}</p>
                            <p style={{margin: 3}}>Generation: {species?.generation && species.generation.name}</p>
                            <p style={{margin: 3}}>Base Experience: {details.base_experience}</p>
                        </div>
                    </div>

                    <div style={{margin: 15}}>
                        {details?.stats && details.stats.map(stat => <div style={{border: '1px solid black', textAlign: 'left', width: '30%', display: 'inline-block'}}><span style={{fontFamily: 'Silkscreen', fontSize: 12, margin: 8}} key={stat.stat.name}>{stat.stat.name}: </span><BorderLinearProgress variant="determinate" value={(stat.base_stat/255)*100} name={stat.stat.name} /></div>)}
                    </div>

                    <div style={{margin: 2, textAlign: 'left'}}>
                        <p>Abilities: {details?.abilities && details?.abilities.map(ability=> <span key={ability.ability.name}>{ability.ability.name} ✦ </span>)}</p>
                        <p>Types: {details?.types && details.types.map(type => <span key={type.type.name}>{type.type.name} | </span>)}</p>
                    </div>

                    <div>
                        <p style={{textAlign: 'left'}}>Moves: </p>
                        {details?.moves && details.moves.map((move, index) => <span style={{color: colors[index%2]}} key={move.move.name}>{move.move.name} </span>)}
                    </div>
                </div>
            }
    </div>
} export default PokemonDetails