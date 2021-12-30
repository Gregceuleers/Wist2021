export const BaseURL = 'http://localhost:8080/';

export const typesManche = [
  {
    label: "Trou",
    selectionInactive: false,
    winPoints: 6,
    winPointsByLevee: 12,
    loosePoints: 12
  },
  {
    label: "Emballage",
    selectionInactive: true,
    winPoints: 3,
    winPointsByLevee: 2,
    loosePoints: 3,
    loosePointsByLevee: 4,
    children: [
      {
        label: "Emballage à 8",
        selectionInactive: false

      },
      {
        label: "Emballage à 9",
        selectionInactive: false
      },
      {
        label: "Emballage à 10",
        selectionInactive: false
      },
      {
        label: "Emballage à 11",
        selectionInactive: false
      }
    ]
  },
  {
    label: 'Seul',
    selectionInactive: true,

    children: [
      {
        label: "Seul 6",
        winPoints: 9,
        winPointsByLevee: 3,
        loosePoints: 12,
        loosePointsByLevee: 3,
        selectionInactive: false
      },
      {
        label: "Seul 7",
        selectionInactive: false
      },
      {
        label: "Seul 8",
        selectionInactive: false
      }
    ]
  },
  {
    label: "Abondance",
    selectionInactive: true,
    children: [
      {
        label: "Abondance 8",
        selectionInactive: false
      },
      {
        label: "Abondance 9",
        selectionInactive: false
      }
    ]
  },
  {
    label: "Petite misère",
    selectionInactive: false
  },
  {
    label: "Piccolissimo",
    selectionInactive: false
  },
  {
    label: "Grande misère",
    selectionInactive: false
  },
  {
    label: "Piccolo",
    selectionInactive: false
  },
  {
    label: "Petit solo chelem",
    selectionInactive: false
  },
  {
    label: "Grand solo chelem",
    selectionInactive: false
  }
];
