export interface Player {
  id?: number;
  name: string;
  pseudo: string;
  email: string;
}
export const playersDB: Player[] = [
  {
    id: 1,
    name: 'Greg',
    pseudo: 'Ika',
    email: 'ceuleersgregory@gmail.com'
  },
  {
    id: 2,
    name: 'Pierre-Jean',
    pseudo: 'PJ',
    email: 'pjpirotte@gmail.com'
  },
  {
    id: 3,
    name: 'Joël',
    pseudo: 'Maniko',
    email: 'jo.maniko@gmail.com'
  },
  {
    id: 4,
    name: 'Manu',
    pseudo: 'Manolo',
    email: 'emmanuelhortmanns@gmail.com'
  }
]


