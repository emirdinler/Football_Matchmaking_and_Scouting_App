const fakeMatches = [
    {
      id: 1,
      postedBy: "Taha Enes Erden",
      team1: {
        id: 101,
        name: "Bacaksızlar FK",
        logo: "https://api.iconify.design/twemoji:flag-turkey.svg"
      },
      team2: {
        id: 102,
        name: "Ayak Kıranlar",
        logo: "https://api.iconify.design/openmoji:goal-net.svg"
      },
      score1: 6,
      score2: 0,
      date: "2025-03-25",
      scorers1: [
        { id: 201, name: "Enes", goals: 3 },
        { id: 202, name: "Mert", goals: 2 },
        { id: 203, name: "Kerem", goals: 1 }
      ],
      scorers2: []
    },
    {
      id: 2,
      postedBy: "Ahmet Güçlü",
      team1: {
        id: 103,
        name: "Kaldırımlar United",
        logo: "https://api.iconify.design/twemoji:football.svg"
      },
      team2: {
        id: 104,
        name: "Yürüyen Bacaklar",
        logo: "https://api.iconify.design/mdi:soccer.svg"
      },
      score1: 2,
      score2: 2,
      date: "2025-03-20",
      scorers1: [
        { id: 204, name: "Ali", goals: 2 }
      ],
      scorers2: [
        { id: 205, name: "Yusuf", goals: 1 },
        { id: 206, name: "Emre", goals: 1 }
      ]
    },
    {
        id: 3,
        postedBy: "Burak Kaptan",
        team1: {
          id: 105,
          name: "Vur Geç SK",
          logo: "https://api.iconify.design/noto:man-running.svg"
        },
        team2: {
          id: 106,
          name: "Yokuş Yukarı FK",
          logo: "https://api.iconify.design/twemoji:mountain.svg"
        },
        score1: 4,
        score2: 1,
        date: "2025-03-18",
        scorers1: [
          { id: 207, name: "Burak", goals: 2 },
          { id: 208, name: "Efe", goals: 1 },
          { id: 209, name: "Salih", goals: 1 }
        ],
        scorers2: [
          { id: 210, name: "Kemal", goals: 1 }
        ]
      },
      {
        id: 4,
        postedBy: "Mehmet Akif",
        team1: {
          id: 107,
          name: "Çimen Spor",
          logo: "https://api.iconify.design/noto:herb.svg"
        },
        team2: {
          id: 108,
          name: "Beton City",
          logo: "https://api.iconify.design/mdi:city.svg"
        },
        score1: 1,
        score2: 3,
        date: "2025-03-17",
        scorers1: [
          { id: 211, name: "Mete", goals: 1 }
        ],
        scorers2: [
          { id: 212, name: "Okan", goals: 2 },
          { id: 213, name: "Arda", goals: 1 }
        ]
      },
      {
        id: 5,
        postedBy: "Can Aydın",
        team1: {
          id: 109,
          name: "Asfalt Kartalları",
          logo: "https://api.iconify.design/twemoji:eagle.svg"
        },
        team2: {
          id: 110,
          name: "Saha Bekçileri",
          logo: "https://api.iconify.design/noto:guard.svg"
        },
        score1: 0,
        score2: 0,
        date: "2025-03-15",
        scorers1: [],
        scorers2: []
      }
  ];
  
  export default fakeMatches;
  