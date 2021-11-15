export interface Player {
  id?: number;
  name: string;
  pseudo: string;
  email: string;
  nbPartiesJouees: number;
  totalPoints: number;
}
export const playersDB: Player[] = [
  {
    id: 1,
    name: 'Greg',
    pseudo: 'Ika',
    email: 'ceuleersgregory@gmail.com',
    nbPartiesJouees: 0,
    totalPoints: 0
  },
  {
    id: 2,
    name: 'Pierre-Jean',
    pseudo: 'PJ',
    email: 'pjpirotte@gmail.com',
    nbPartiesJouees: 0,
    totalPoints: 0
  },
  {
    id: 3,
    name: 'Joël',
    pseudo: 'Maniko',
    email: 'jo.maniko@gmail.com',
    nbPartiesJouees: 0,
    totalPoints: 0
  },
  {
    id: 4,
    name: 'Manu',
    pseudo: 'Manolo',
    email: 'emmanuelhortmanns@gmail.com',
    nbPartiesJouees: 0,
    totalPoints: 0
  }
]


