import { Seccion } from './seccion';
import { Elemento } from './elemento';
import { Collection } from './collection';

const lorem = ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ad similique ratione dolores aliquid fugit asperiores possimus. Atque mollitia repudiandae velit. Amet aliquam error suscipit maxime ea similique voluptatum minima.Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ad similique ratione dolores aliquid fugit asperiores possimus. Atque mollitia repudiandae velit. Amet aliquam error suscipit maxime ea similique voluptatum minima. `;

const elem1: Collection<Elemento> = new Collection<Elemento>(Elemento);
elem1.parse(
  [{
    id: 1,
    nombre: 'Elemento1',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-languaje',
    contDinamico: 'Es',
  },

  {
    id: 2,
    nombre: 'Elemento2',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-languaje',
    contDinamico: 'Es',
  },
  {
    id: 3,
    nombre: 'Elemento3',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-img',
    contDinamico: 'crypto-trading.png',
  },
  {
    id: 4,
    nombre: 'Elemento4',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-grap',
    contDinamico: '45',
  },
]);

const elem2: Collection<Elemento> = new Collection<Elemento>(Elemento);
elem2.parse([
  {
    id: 5,
    nombre: 'Elemento5',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-languaje',
    contDinamico: 'Es',
  },

  {
    id: 6,
    nombre: 'Elemento6',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-languaje',
    contDinamico: 'Es',
  },
  {
    id: 7,
    nombre: 'Elemento7',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-img',
    contDinamico: 'crypto-trading.png',
  },
  {
    id: 8,
    nombre: 'Elemento8',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-grap',
    contDinamico: '45',
  },
]);

const elem3: Collection<Elemento> = new Collection<Elemento>(Elemento);
elem3.parse([
  {
    id: 9,
    nombre: 'Elemento9',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-grap',
    contDinamico: '45',
  },
  {
    id: 10,
    nombre: 'Elemento10',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-grap',
    contDinamico: '60',
  },
  {
    id: 11,
    nombre: 'Elemento11',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-grap',
    contDinamico: '80',
  },
  {
    id: 12,
    nombre: 'Elemento12',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-grap',
    contDinamico: '90',
  },
]);

const elem4: Collection<Elemento> = new Collection<Elemento>(Elemento);
elem4.parse([
  {
    id: 13,
    nombre: 'Elemento13',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-languaje',
    contDinamico: 'Es',
  },
  {
    id: 14,
    nombre: 'Elemento14',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-languaje',
    contDinamico: 'En',
  },
]);

const elem5: Collection<Elemento> = new Collection<Elemento>(Elemento);
elem5.parse([
  {
    id: 15,
    nombre: 'Elemento15',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-languaje',
    contDinamico: 'Es',
  },

  {
    id: 16,
    nombre: 'Elemento16',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-languaje',
    contDinamico: 'Es',
  },
  {
    id: 17,
    nombre: 'Elemento17',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-img',
    contDinamico: 'crypto-trading.png',
  },
  {
    id: 18,
    nombre: 'Elemento18',
    titulo: 'algo',
    descripcion: lorem,
    classType: 'element-grap',
    contDinamico: '45',
  },
]);

export const SECCIONES= new Collection<Seccion>(Seccion);
SECCIONES.parse( [
  {id: 1,nombre: 'Experiencia',className: 'experiencia',displayMode:'element-list',elementos:elem1},
  {id: 2,nombre: 'Formacion',className: 'formacion',displayMode:'element-list',elementos:elem2},
  {id: 3,nombre: 'Skills',className: 'skills',displayMode:'element-list-table',elementos:elem3},
  {id: 4,nombre: 'Idiomas',className: 'idiomas',displayMode:'element-list-table',elementos:elem4},
  {id: 5,nombre: 'Proyectos',className: 'proyectos',displayMode:'element-list',elementos:elem5},
]);

 