import { Socialmedia } from "./socialmedia";
import { Collection } from './collection'

export const SOCIALDATA: Collection<Socialmedia> = new Collection<Socialmedia>(
  Socialmedia,""
);
SOCIALDATA.parse( [
  { id: 1, icon: 'fa-linkedin-square', url: 'linkedin' },
  { id: 2, icon: 'fa-twitter-square', url: 'twitter' },
  { id: 3, icon: 'fa-github-square', url: 'github' },
]);