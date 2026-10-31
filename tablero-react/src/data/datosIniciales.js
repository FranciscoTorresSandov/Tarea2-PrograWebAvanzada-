// =========================================
// DATOS INICIALES DEL CLUB DE LECTURA
//
// Esta parte NO consume APIs externas.
//
// Los arreglos proporcionan la información
// inicial que React utilizará para renderizar
// el tablero.
// =========================================

export const miembrosIniciales = [
  {
    id: "miembro-001",
    nombre: "Ana Rodríguez"
  },
  {
    id: "miembro-002",
    nombre: "Carlos Méndez"
  },
  {
    id: "miembro-003",
    nombre: "Lucía Fernández"
  }
];

export const librosIniciales = [
  {
    id: "libro-001",
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    anio: 1943,
    estado: "Pendiente",
    miembroId: "miembro-001"
  },
  {
    id: "libro-002",
    titulo: "1984",
    autor: "George Orwell",
    anio: 1949,
    estado: "Leyendo",
    miembroId: "miembro-002"
  },
  {
    id: "libro-003",
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    anio: 1967,
    estado: "Leído",
    miembroId: "miembro-003"
  },
  {
    id: "libro-004",
    titulo: "El hobbit",
    autor: "J. R. R. Tolkien",
    anio: 1937,
    estado: "Pendiente",
    miembroId: "miembro-001"
  }
];