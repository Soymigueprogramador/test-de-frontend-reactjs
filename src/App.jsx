// Importaciones.
import { useState, useEffect } from 'react'; // HOOKS: Son funciones que ya vienen incorporadas en React.js
import './grid.css'; // Acá se guardan los estilos usados para la grilla.

const App = () => {
  // Estados
  const [filas, setFilas] = useState(0);
  const [grid, setGrid] = useState([]);
  const [pintado, setPintado] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuCerrado, setMenuCerrado] = useState({ x: 0, y: 0 });

  // Constante para indicar la cantidad de columnas.
  const columnas = 100;

  // Hook para calcular las filas dinámicamente según el tamaño de la ventana
  useEffect(() => {
    const calcularFilas = () => {
      const alturaFilas = 10;
      setFilas(Math.floor(window.innerHeight / alturaFilas));
    };

    calcularFilas(); 
    window.addEventListener('resize', calcularFilas);
    return () => window.removeEventListener('resize', calcularFilas);
  }, []);

  // Crear la grilla con los colores iniciales (blanco)
  useEffect(() => {
    setGrid(new Array(filas * columnas).fill('white'));
  }, [filas]);

  // Función para cambiar el color de una celda
  const cambiarColor = (i) => {
    setGrid((prev) => {
      const nuevaGrid = [...prev];
      nuevaGrid[i] = nuevaGrid[i] === 'white' ? pintado : 'white';
      return nuevaGrid;
    });
  };

  // Función para seleccionar un color
  const seleccionarColor = (color) => {
    setPintado(color);
    setMenuVisible(false);
  };

  // Función para cambiar el color al pasar el mouse
  const mouseOver = (index) => {
    if (pintado) cambiarColor(index);
  };

  // Función para manejar el clic derecho (abrir menú de colores)
  const clickDerecho = (e, index) => {
    e.preventDefault();
    setMenuCerrado({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  return (
    <> {/* Fragmento para evitar un div extra */}
      <div
        className="grid"
        onMouseDown={() => setPintado(true)}
        onMouseUp={() => setPintado(false)}
      >
        {grid.map((color, index) => (
          <div
            key={index}
            className="celda"
            style={{ backgroundColor: color }}
            onClick={() => cambiarColor(index)}
            onMouseOver={() => mouseOver(index)}
            onContextMenu={(e) => clickDerecho(e, index)}
          ></div>
        ))}
      </div>

      {/* Menú de selección de color */}
      {menuVisible && (
        <div
          className="menu-color"
          style={{ top: menuCerrado.y, left: menuCerrado.x }}
          onMouseLeave={() => setMenuVisible(false)}
        >
          {["red", "blue", "green", "yellow", "black"].map((color) => (
            <div
              key={color}
              className="opcion-color"
              style={{ backgroundColor: color }}
              onClick={() => seleccionarColor(color)}
            ></div>
          ))}
        </div>
      )}
    </>
  );
};

export default App;