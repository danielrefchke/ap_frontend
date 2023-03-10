import { Header } from './header';

const lorem =
  '<div>usuario: admin pass: 123465678</div><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ad similique ratione dolores aliquid fugit asperiores possimus.</div>';

export const HEADERDATA = new Header({
  id: 1,
  nombre: 'Daniel Refchke',
  titulo: 'full stack developer jr',
  descripcion: lorem,
  imgback: 'erica-magugliani-olSh3t6DGSk-unsplash.jpg',
  imgpersona: '20180612_005858.jpg',
  imgcred: 'Erica Magugliani desde Unsplash.com',
});
