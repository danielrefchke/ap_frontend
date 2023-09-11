export const CONNECTIONS = {
  BASE_PATH: "https://apbackendrefchke.onrender.com",
  //BASE_PATH: "http://localhost:8080",//
  AUTH_API: "/login",
  USER_DATA_RECOVER: "/users",
  USER_NAME_VERIFIER: "/users/exist",
  DATA_API: "/persona/1",
  ICONS: "/icons",
  IMAGES: "/images",
  SOCIAL_MEDIA: "/social",
  SECCIONES: "/seccion",
  USER_LIST: "/users",
  ELEMENTOS: "/elemento",
  START_SERVICE:"/health",
  DELAY_TIME: 30000, // MILISECS
  MAX_RETRIES : 4 // RETRIES TO CONNECT
} as const;

export const STATUS_MESSAGE_GROUPS: string[][] = [
  // Grupo 1: Mensajes de gnomos
  [
  'Los gnomos te saludan, pero el servidor está durmiendo.',
  'Los gnomos se escondieron, el servidor no responde.',
  '¡Los gnomos jugaron con los cables!',
  'Intento fallido, los gnomos hicieron travesuras.',
  '¡Los gnomos del servidor están de vacaciones!',
  'Los gnomos están de huelga, intenta nuevamente.',
  ],

  // Grupo 2: Mensajes humorísticos
  [
  'Intento fallido, los unicornios dejaron huellas mágicas.',
  'Los unicornios están en una búsqueda mágica.',
  '¡Los unicornios pintaron el servidor de colores!',
  'Los unicornios se llevaron las llaves del servidor.',
  'Los unicornios te envían saludos, pero el servidor está en su propio mundo.',
  '¡Un unicornio baila en el servidor, intenta nuevamente!',
  ],

  [
  'El cabrito decidió quedarse dentro del servidor.',
  'El cabrito se esconde en el servidor, ¡necesitamos persuadirlo!',
  'Intento fallido, el cabrito está siendo terco.',
  '¡El cabrito está disfrutando su tiempo en el servidor!',
  'El cabrito te envía sus saludos, pero se niega a salir.',
  '¡El cabrito no quiere ceder el control del servidor!',
  ],

  [
  'Un tornillo suelto está causando problemas en el servidor.',
  'Los tornillos del servidor se aflojaron, necesitamos apretarlos.',
  'Intento fallido, parece que hay un tornillo desprendido.',
  'Los tornillos te saludan, pero están revueltos en el servidor.',
  '¡Los tornillos del servidor están en huelga!',
  '¡Los tornillos se divierten en el servidor, intenta nuevamente!',
  ],

];
