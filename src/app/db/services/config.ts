export const BaseURL = 'http://localhost:8080/';

export const typesManche = [
  {
    label: "Trou",
    selectionInactive: false,
    winPoints: 6,
    winPointsPassif: 12,
    loosePointsPassif: -6,
    winAllLevees: 12,
    loosePoints: -12,
    looseAllLevees: -12,
    jeuADeux: true
  },
  {
    label: "Emballage",
    selectionInactive: true,
    selectable: false,
    children: [
      {
        label: "Emballage à 8",
        selectionInactive: false,
        jeuADeux: true,
        winAllLevees: 15,
        looseAllLevees: -15,
        winPoints: 3,
        loosePointsPassif: -3,
        loosePointsPassifByLevee: -2,
        winPointsByLevee: 2,
        loosePoints: -3,
        loosePointsByLevee: -4,
        winPointsPassif: 3,
        winPointsPassifByLevee: 4
      },
      {
        label: "Emballage à 9",
        selectionInactive: false,
        jeuADeux: true,
        winAllLevees: 15,
        looseAllLevees: -15,
        winPoints: 3,
        loosePointsPassif: -3,
        loosePointsPassifByLevee: -2,
        winPointsByLevee: 2,
        loosePoints: -3,
        loosePointsByLevee: -4,
        winPointsPassif: 3,
        winPointsPassifByLevee: 4
      },
      {
        label: "Emballage à 10",
        selectionInactive: false,
        jeuADeux: true,
        winAllLevees: 15,
        looseAllLevees: -15,
        winPoints: 3,
        loosePointsPassif: -3,
        loosePointsPassifByLevee: -2,
        winPointsByLevee: 2,
        loosePoints: -3,
        loosePointsByLevee: -4,
        winPointsPassif: 3,
        winPointsPassifByLevee: 4
      },
      {
        label: "Emballage à 11",
        selectionInactive: false,
        jeuADeux: true,
        winAllLevees: 15,
        looseAllLevees: -15,
        winPoints: 3,
        loosePointsPassif: -3,
        loosePointsPassifByLevee: -2,
        winPointsByLevee: 2,
        loosePoints: -3,
        loosePointsByLevee: -4,
        winPointsPassif: 3,
        winPointsPassifByLevee: 4,
      }
    ]
  },
  {
    label: 'Seul',
    selectionInactive: true,
    selectable: false,
    children: [
      {
        label: "Seul 6",
        winPoints: 9,
        loosePointsPassif: -3,
        loosePointsPassifByLevee: -1,
        winPointsByLevee: 3,
        loosePoints: -6,
        loosePointsByLevee: -6,
        winPointsPassif: 2,
        winPointsPassifByLevee: 2,
        selectionInactive: false
      },
      {
        label: "Seul 7",
        winPoints: 9,
        loosePointsPassif: -3,
        loosePointsPassifByLevee: -1,
        winPointsByLevee: 3,
        loosePoints: -6,
        loosePointsByLevee: -6,
        winPointsPassif: 2,
        winPointsPassifByLevee: 2,
        selectionInactive: false
      },
      {
        label: "Seul 8",
        winPoints: 9,
        loosePointsPassif: -3,
        loosePointsPassifByLevee: -1,
        winPointsByLevee: 3,
        loosePoints: -6,
        loosePointsByLevee: -6,
        winPointsPassif: 2,
        winPointsPassifByLevee: 2,
        selectionInactive: false
      }
    ]
  },
  {
    label: "Petite misère",
    selectionInactive: true,
    selectable: false,
    children: [
      {
        label: 'Petite misère',
        selectionInactive: false,
        winPoints: 12,
        loosePointsPassif: -4,
        loosePoints: -18,
        winPointsPassif: 6,
      },
      {
        label: 'Petite misère à 2',
        selectionInactive: false,
        jeuADeux: true,
        deuxWinPoints: 8,
        deuxWinPassif: -8,
        unWinPoints: 18,
        unLoosePoints: -22,
        unWinPassif: 2,
        deuxLoosePoints: -18,
        deuxLoosePassif: 18
      }
    ]
  },
  {
    label: 'Emballage à 10 sur misère',
    selectionInactive: false,
    jeuADeux: true,
    winPoints: 9,
    loosePointsPassif: -9,
    loosePoints: -18,
    winPointsPassif: 18,
  },
  {
    label: '8 seul sur misère',
    selectionInactive: false,
    winPoints: 15,
    loosePointsPassif: -5,
    loosePoints: -21,
    winPointsPassif: 7,
  },
  {
    label: "Piccolissimo",
    selectionInactive: true,
    selectable: false,
    children: [
      {
        label: "Piccolissimo",
        selectionInactive: false,
        winPoints: 18,
        loosePointsPassif: -6,
        loosePoints: -27,
        winPointsPassif: 9,
      },
      {
        label: 'Piccolissimo à 2',
        selectionInactive: false,
        jeuADeux: true,
        deuxWinPoints: 12,
        deuxWinPassif: -12,
        unWinPoints: 27,
        unLoosePoints: -33,
        unWinPassif: 3,
        deuxLoosePoints: -18,
        deuxLoosePassif: 18
      }
    ]
  },
  {
    label: "Abondance",
    selectionInactive: true,
    selectable: false,
    children: [
      {
        label: "Abondance",
        selectionInactive: false,
        winPoints: 18,
        loosePointsPassif: -6,
        loosePoints: -27,
        winPointsPassif: 9,
      },
      {
        label: "Abondance sur table",
        selectionInactive: false,
        winPoints: 21,
        loosePointsPassif: -7,
        loosePoints: -33,
        winPointsPassif: 11,
      }
    ]
  },
  {
    label: "Grande misère",
    selectionInactive: false,
    selectable: false,
    children: [
      {
        label: 'Grande misère',
        selectionInactive: false,
        winPoints: 24,
        loosePointsPassif: -8,
        loosePoints: -36,
        winPointsPassif: 12,
      },
      {
        label: 'Grande misère à 2',
        selectionInactive: false,
        jeuADeux: true,
        deuxWinPoints: 16,
        deuxWinPassif: -16,
        unWinPoints: 36,
        unLoosePoints: -44,
        unWinPassif: 4,
        deuxLoosePoints: -24,
        deuxLoosePassif: 24
      },
      {
        label: 'Grande misère sur trou',
        selectionInactive: false,
        winPoints: 30,
        loosePointsPassif: -10,
        loosePoints: -45,
        winPointsPassif: 15,
      }
    ]
  },
  {
    label: "Piccolo",
    selectionInactive: false,
    selectable: false,
    children: [
      {
        label: 'Piccolo',
        selectionInactive: false,
        winPoints: 36,
        loosePointsPassif: -12,
        loosePoints: -48,
        winPointsPassif: 16,
      },
      {
        label: 'Piccolo à 2',
        selectionInactive: false,
        jeuADeux: true,
        deuxWinPoints: 24,
        deuxWinPassif: -24,
        unWinPoints: 52,
        unLoosePoints: -60,
        unWinPassif: 4,
        deuxLoosePoints: -32,
        deuxLoosePassif: 32
      }
    ]
  },
  {
    label: 'Grande misère sur table',
    selectionInactive: false,
    winPoints: 48,
    loosePointsPassif: -16,
    loosePoints: -48,
    winPointsPassif: 16,
  },
  {
    label: "Petit solo chelem",
    selectionInactive: false,
    winPoints: 60,
    loosePointsPassif: -20,
    loosePoints: -60,
    winPointsPassif: 20,
  },
  {
    label: "Solo chelem",
    selectionInactive: false,
    winPoints: 90,
    loosePointsPassif: -30,
    loosePoints: -90,
    winPointsPassif: 30,
  }
];
