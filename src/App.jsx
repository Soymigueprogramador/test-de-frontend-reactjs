// Importaciones.
import { useState, useEffect } from 'react'; // HOOKS: Son funciones que ya vienen incorporadas en React.js
import './grid.css'; // Acá se guardan los estilos usados para la grilla.

const App = () => {
  // El hook useState nos permite crear estados en React.js
  const [filas, setFilas] = useState(0);
  const [grid, setGrid] = useState([]);
  const [pintado, setPintado] = useState(null);
  const [elegirColor, setElegirColor] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuCerrado, setMenuCerrado] = useState({ x: 0, y: 0 });

  // Constante para indicar la cantidad de columnas.
  const columnas = 100;

  // El hook useEffect nos permite manipular los estados y componentes en segundo plano.
  useEffect(() => {
    // Función para calcular las filas.
    const calcularFilas = () => {
      const alturaFilas = 10;
      setFilas(Math.floor(window.innerHeight / alturaFilas));
    };

    calcularFilas(); // Llamando a la función que calcula las filas.
    window.addEventListener('resize', calcularFilas);
    return () => window.removeEventListener('resize', calcularFilas);
  }, []); // Array de dependencias []

  useEffect(() => {
    setGrid(new Array(filas * columnas).fill('white'));
  }, [filas]);

  // Función para cambiar el color.
  const cambiarColor = (i) => {
    setGrid((prev) => {
      const nuevaGrid = [...prev]; // Usamos los "..." para extender el alcance de un array.
      nuevaGrid[i] = nuevaGrid[i] === 'white' ? pintado : 'white';
      return nuevaGrid;
    });
  };

  // Función para seleccionar un color.
  const seleccionarColor = (color) => {
    setPintado(color);
    setMenuVisible(false);
  };

  // Función para controlar el evento del mouse cuando este entra en la grilla.
  const mouseOver = (index) => {
    if (pintado) cambiarColor(index);
  };

  // Función para controlar el evento del mouse cuando se detecta un clic derecho.
  const clickDerecho = (e, index) => {
    e.preventDefault();
    setMenuCerrado({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  return (
    <> {/* Los fragment abreviados <></> se usan como alternativa al div. */}
    
      <div
        className='grid'
        onMouseDown={() => setPintado(true)}
        onMouseUp={() setPintado(false)}
      >
        {
          grid,math((color, index) => {
            <div
              key={index}
              className='celdas'
              style={{ backgroundColor: color }}
              onClick={() => cambiarColor(index)}
            >

          })
        }
      </div>

    </>
  );
};

export default App;
