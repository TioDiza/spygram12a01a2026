export interface LocationData {
  city: string;
  country: string;
  state: string; // Adicionado o estado
}

// Mapeamento de estados para uma lista de cidades relevantes
const citiesByState: { [key: string]: string[] } = {
  'Acre': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó'],
  'Alagoas': ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Penedo', 'Maragogi'],
  'Amapá': ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque'],
  'Amazonas': ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari'],
  'Bahia': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna', 'Porto Seguro'],
  'Ceará': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Jericoacoara'],
  'Distrito Federal': ['Brasília', 'Taguatinga', 'Ceilândia', 'Gama', 'Sobradinho'],
  'Espírito Santo': ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Guarapari'],
  'Goiás': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Caldas Novas'],
  'Maranhão': ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias'],
  'Mato Grosso': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra'],
  'Mato Grosso do Sul': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Bonito'],
  'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Tiradentes', 'Ouro Preto', 'São João del Rei', 'Diamantina'],
  'Pará': ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Parauapebas'],
  'Paraíba': ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux'],
  'Paraná': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'Foz do Iguaçu'],
  'Pernambuco': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Porto de Galinhas'],
  'Piauí': ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano'],
  'Rio de Janeiro': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Angra dos Reis', 'Búzios'],
  'Rio Grande do Norte': ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante'],
  'Rio Grande do Sul': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gramado'],
  'Rondônia': ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena'],
  'Roraima': ['Boa Vista', 'Rorainópolis', 'Caracaraí'],
  'Santa Catarina': ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Chapecó', 'Balneário Camboriú'],
  'São Paulo': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Santos'],
  'Sergipe': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana'],
  'Tocantins': ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional']
};

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getUserLocation = async (): Promise<LocationData> => {
  try {
    const response = await fetch('http://ip-api.com/json/?fields=city,country,regionName');
    if (!response.ok) throw new Error('Failed to fetch location data');
    const data = await response.json();
    return {
      city: data.city || 'São Paulo',
      country: data.country || 'Brazil',
      state: data.regionName || 'São Paulo',
    };
  } catch (error) {
    console.error('Error fetching user location:', error);
    return { city: 'São Paulo', country: 'Brazil', state: 'São Paulo' };
  }
};

export const getCitiesByState = (userCity: string, state: string): string[] => {
  const stateCities = citiesByState[state] || citiesByState['São Paulo'];
  const otherCities = stateCities.filter(city => city.toLowerCase() !== userCity.toLowerCase());
  const shuffledCities = shuffleArray(otherCities);
  const citiesToAdd = shuffledCities.slice(0, 7);
  return shuffleArray([userCity, ...citiesToAdd]);
};