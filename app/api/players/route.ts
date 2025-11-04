import { NextResponse } from 'next/server';

interface Tournament {
  name: string;
  date: string;
  tier: number;
}

interface Player {
  id: string;
  name: string;
  realName: string;
  team: string;
  tournaments: Tournament[];
}

async function fetchLiquipediaData() {
  // This simulates fetching data from Liquipedia API
  // In a real implementation, you would use the Liquipedia API or scrape the website
  // For this demo, we'll return sample data of known Chinese Dota 2 players

  const chinesePlayers: Player[] = [
    {
      id: "1",
      name: "Ame",
      realName: "Wang Chunyu",
      team: "Team Aster",
      tournaments: [
        { name: "DreamLeague Season 24", date: "2025-03-15", tier: 1 },
        { name: "ESL One Berlin 2025", date: "2025-05-20", tier: 1 }
      ]
    },
    {
      id: "2",
      name: "Chalice",
      realName: "Yang Shenyi",
      team: "Team Aster",
      tournaments: [
        { name: "DreamLeague Season 24", date: "2025-03-15", tier: 1 },
        { name: "ESL One Berlin 2025", date: "2025-05-20", tier: 1 }
      ]
    },
    {
      id: "3",
      name: "XinQ",
      realName: "Zeng Xinquan",
      team: "Team Aster",
      tournaments: [
        { name: "DreamLeague Season 24", date: "2025-03-15", tier: 1 },
        { name: "PGL Wallachia Season 2", date: "2025-07-10", tier: 1 }
      ]
    },
    {
      id: "4",
      name: "Lou",
      realName: "Lou Yun",
      team: "Team Aster",
      tournaments: [
        { name: "DreamLeague Season 24", date: "2025-03-15", tier: 1 }
      ]
    },
    {
      id: "5",
      name: "BoBoKa",
      realName: "Liu Yaqi",
      team: "Team Aster",
      tournaments: [
        { name: "DreamLeague Season 24", date: "2025-03-15", tier: 1 }
      ]
    },
    {
      id: "6",
      name: "old chicken",
      realName: "Zhang Bin",
      team: "LGD Gaming",
      tournaments: [
        { name: "The International 2025", date: "2025-08-25", tier: 1 },
        { name: "ESL One Birmingham 2025", date: "2025-06-05", tier: 1 }
      ]
    },
    {
      id: "7",
      name: "NothingToSay",
      realName: "Cheng Jin Xiang",
      team: "LGD Gaming",
      tournaments: [
        { name: "The International 2025", date: "2025-08-25", tier: 1 },
        { name: "ESL One Birmingham 2025", date: "2025-06-05", tier: 1 }
      ]
    },
    {
      id: "8",
      name: "Faith_bian",
      realName: "Zhang Ruida",
      team: "LGD Gaming",
      tournaments: [
        { name: "The International 2025", date: "2025-08-25", tier: 1 }
      ]
    },
    {
      id: "9",
      name: "y`",
      realName: "Zhang Yiping",
      team: "LGD Gaming",
      tournaments: [
        { name: "The International 2025", date: "2025-08-25", tier: 1 }
      ]
    },
    {
      id: "10",
      name: "XM",
      realName: "Xu Minghao",
      team: "LGD Gaming",
      tournaments: [
        { name: "ESL One Birmingham 2025", date: "2025-06-05", tier: 1 }
      ]
    },
    {
      id: "11",
      name: "Paparazi",
      realName: "Lu Zhigang",
      team: "Xtreme Gaming",
      tournaments: [
        { name: "The International 2025", date: "2025-08-25", tier: 1 },
        { name: "DreamLeague Season 25", date: "2025-09-12", tier: 1 }
      ]
    },
    {
      id: "12",
      name: "Pyw",
      realName: "Jiang Yongyang",
      team: "Xtreme Gaming",
      tournaments: [
        { name: "The International 2025", date: "2025-08-25", tier: 1 }
      ]
    },
    {
      id: "13",
      name: "JT",
      realName: "Jiang Tao",
      team: "Xtreme Gaming",
      tournaments: [
        { name: "The International 2025", date: "2025-08-25", tier: 1 }
      ]
    },
    {
      id: "14",
      name: "Dy",
      realName: "Ding Yi",
      team: "Xtreme Gaming",
      tournaments: [
        { name: "DreamLeague Season 25", date: "2025-09-12", tier: 1 }
      ]
    },
    {
      id: "15",
      name: "Super",
      realName: "Xie Junhao",
      team: "EHOME",
      tournaments: [
        { name: "ESL One Manila 2025", date: "2025-04-18", tier: 1 }
      ]
    },
    {
      id: "16",
      name: "Erica",
      realName: "Zhong Tianzhe",
      team: "EHOME",
      tournaments: [
        { name: "ESL One Manila 2025", date: "2025-04-18", tier: 1 }
      ]
    },
    {
      id: "17",
      name: "old eLeVeN",
      realName: "Ren Yangwei",
      team: "Invictus Gaming",
      tournaments: [
        { name: "PGL Copenhagen Major 2025", date: "2025-02-10", tier: 1 }
      ]
    },
    {
      id: "18",
      name: "Emo",
      realName: "Wen Zheng",
      team: "Invictus Gaming",
      tournaments: [
        { name: "PGL Copenhagen Major 2025", date: "2025-02-10", tier: 1 },
        { name: "WePlay Animajor 2025", date: "2025-10-05", tier: 1 }
      ]
    },
    {
      id: "19",
      name: "JiuZhang",
      realName: "Wang Jiuzhang",
      team: "Invictus Gaming",
      tournaments: [
        { name: "WePlay Animajor 2025", date: "2025-10-05", tier: 1 }
      ]
    },
    {
      id: "20",
      name: "Oli",
      realName: "Lin Kai",
      team: "Invictus Gaming",
      tournaments: [
        { name: "PGL Copenhagen Major 2025", date: "2025-02-10", tier: 1 }
      ]
    }
  ];

  return chinesePlayers;
}

export async function GET() {
  try {
    const players = await fetchLiquipediaData();
    return NextResponse.json({
      success: true,
      count: players.length,
      players
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch player data' },
      { status: 500 }
    );
  }
}
