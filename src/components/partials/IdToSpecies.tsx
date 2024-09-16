interface IdToSPeciesProps{
  speciesId : number;
}

// Correspondance entre species_id et nom d'espèce
const speciesMap: { [key: number]: string } = {
  1: 'Chat',
  2: 'Chien',
  3: 'Cheval',
  4: 'Lapin',
  5: "Cochon d'Inde",
  6: 'Hamster',
  7: 'Furet',
  8: 'Oiseau',
  9: 'Serpent',
  10: 'Lézard',
  11: 'Tortue',
  12: 'Rat',
};
export default function IdToSPecies({speciesId}:IdToSPeciesProps){

return(
  speciesMap[speciesId]
)
}