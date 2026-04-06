# Buscador Pokemon

Aplicacion React para buscar Pokemon usando la **PokéAPI**. Permite buscar por nombre (parcial o completo) o por ID, mostrando las tarjetas con animacion de volteo 3D que revelan estadisticas, tipos, descripcion y cadena de evolucion.

**Demo en vivo:** https://Eudald2000.github.io/Buscador-Pokemon/

---

## Caracteristicas

- Busqueda por **ID numerico** o por **nombre** (soporta coincidencias parciales, ej: "pika" encuentra "pikachu")
- **Tarjeta con volteo 3D** — frente con imagen y estadisticas, dorso con tipos, descripcion y evolucion
- **Colores dinamicos** basados en el tipo del Pokemon (gradiente para tipos dobles)
- **Descripcion en español** obtenida desde la PokéAPI
- **Cadena de evolucion** completa (ej: bulbasaur → ivysaur → venusaur)
- **Multiples resultados** en grid responsive cuando la busqueda coincide con varios Pokemon
- **Caching** de la lista completa de Pokemon para busquedas por nombre mas rapidas

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 | UI y gestion de estado |
| Vite 7 + SWC | Build tool y servidor de desarrollo |
| Bootstrap 5 | Grid responsive y utilidades CSS |
| PokéAPI | Fuente de datos de todos los Pokemon |
| gh-pages | Deploy automatizado a GitHub Pages |

---

## API

Usa [PokéAPI](https://pokeapi.co/) con los siguientes endpoints:

- `GET /pokemon/{id-or-name}` — datos del Pokemon (imagen, tipos, estadisticas, habilidades)
- `GET /pokemon?limit=1000` — lista completa de nombres (cacheada en memoria)
- `GET /pokemon-species/{id}` — texto descriptivo y URL de la cadena de evolucion
- `GET /evolution-chain/{id}` — cadena de evolucion completa

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Buscador.jsx        # Formulario de busqueda
│   ├── PokemonCard.jsx     # Tarjeta con animacion de volteo
│   ├── FrontCard.jsx       # Cara delantera: imagen, ID, stats
│   ├── BackCard.jsx        # Cara trasera: tipos, descripcion, evolucion
│   ├── PokemonList.jsx     # Grid para multiples resultados
│   ├── Loading.jsx         # Spinner de carga
│   ├── PokemonError.jsx    # Mensaje de error
│   └── Instrucciones.jsx   # Pantalla de bienvenida
├── hooks/
│   └── useUnPokemon.js     # Hook principal con toda la logica de fetching
├── services/
│   ├── pokemonId.js        # Fetch por ID o nombre
│   ├── pokemonSecie.js     # Fetch de datos de especie
│   ├── pokemonLimit.js     # Fetch de lista completa (con cache)
│   └── colores.js          # Mapa tipo → color hex
└── App.jsx                 # Componente raiz
```

---

## Instalacion y uso

```bash
# Instalar dependencias
npm install

# Modo desarrollo con HMR
npm run dev

# Build de produccion
npm run build

# Preview del build
npm run preview

# Deploy a GitHub Pages
npm run deploy
```

---

## Como funciona la busqueda

1. Si el termino es **numerico** → fetch directo a `/pokemon/{id}`
2. Si es **texto** → se descarga la lista de ~1000 Pokemon (cacheada tras la primera llamada), se filtran los nombres que incluyen el termino, y se hace fetch en paralelo de cada coincidencia
3. Para cada Pokemon se encadenan llamadas a la API de especie y evolucion para obtener descripcion en español y la linea evolutiva
