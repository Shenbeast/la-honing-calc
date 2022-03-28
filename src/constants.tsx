import _ from "lodash"

export const ARMOR_STONES = {
  GUARDIAN_STONE_FRAGMENT: {
    name: "Guardian Stone Fragment",
    tier: 1,
    gold: 1,
    gold_crystal: 0,
    mari_amount: 15,
    mari_crystal: 25
  },
  GUARDIAN_STONE: {
    name: "Guardian Stone",
    tier: 2,
    gold: 6,
    gold_crystal: 0,
    mari_amount: 40,
    mari_crystal: 80
  },
  GUARDIAN_STONE_CRYSTAL: {
    name: "Guardian Stone Crystal",
    tier: 1,
    gold: 13,
    gold_crystal: 0,
    mari_amount: 20,
    mari_crystal: 60
  }
}

export const WEAPON_STONES = {
  DESTRUCTION_STONE_FRAGMENT: {
    name: "Destruction Stone Fragment",
    tier: 1,
    gold: 2,
    gold_crystal: 0,
    mari_amount: 5,
    mari_crystal: 20
  },
  DESTRUCTION_STONE:{
    name: "Destruction Stone",
    tier: 2,
    gold: 4,
    gold_crystal: 0,
    mari_amount: 5,
    mari_crystal: 25
  },
  DESTRUCTION_STONE_CRYSTAL: {
    name: "Destruction Stone Crystal",
    tier: 3,
    gold: 23,
    gold_crystal: 0,
    mari_amount: 5,
    mari_crystal: 40
  }
}

export const LEAPSTONES = {
  HARMONY_LEAPSTONE: {
    name: "Harmony Leapstone",
    tier: 1,
    gold: 10,
    gold_crystal: 0,
    mari_amount: 15,
    mari_crystal: 15
  },
  LIFE_LEAPSTONE: {
    name: "Life Leapstone",
    tier: 2,
    gold: 17,
    gold_crystal: 0,
    mari_amount: 10,
    mari_crystal: 14
  },
  HONOR_LEAPSTONE: {
    name: "Honor Leapstone",
    tier: 3,
    gold: 35,
    gold_crystal: 0,
    mari_amount: 5,
    mari_crystal: 10,
  },
  GREAT_HONOR_LEAPSTONE: {
    name: "Great Honor Leapstone",
    tier: 4,
    gold: 195,
    gold_crystal: 0,
  }
}

export const RATE_UP_STONES = {
  STAR_BREATH : {
    name: "Star Breath",
    tier: 1,
    gold: 8,
    gold_crystal: 0,
    rate_up_bonus: 0,
    mari_amount: 5,
    mari_crystal: 20
  },
  MOON_BREATH : {
    name: "Moon Breath",
    tier: 2,
    gold: 22,
    gold_crystal: 0,
    rate_up_bonus: 0,
    mari_amount: 5,
    mari_crystal: 30
  },
  SOLAR_GRACE : {
    name: "Solar Grace",
    tier: 3,
    gold: 35,
    gold_crystal: 0,
    rate_up_bonus: 0,
    mari_amount: 20,
    mari_crystal: 80
  },
  SOLAR_BLESSING : {
    name: "Solar Blessing",
    tier: 3,
    gold: 100,
    gold_crystal: 0,
    rate_up_bonus: 0,
    mari_amount: 15,
    mari_crystal: 150
  },
  SOLAR_PROTECTION : {
    name: "Solar Protection",
    tier: 3,
    gold: 200,
    gold_crystal: 0,
    rate_up_bonus: 0,
    mari_amount: 3,
    mari_crystal: 150
  },
  WEAPON_BOOK_1: {
    name: "Metal Book Basic",
    tier: 3,
    gold: 1700,
    rate_up_bonus: 0,
  },
  ARMOR_BOOK_1: {
    name: "Armor Book Basic",
    tier: 3,
    gold: 1000,
    rate_up_bonus: 0,
  }
}

export const MARKET_VALUES = [
  {
    tier: 1,
    armor_stone: ARMOR_STONES.GUARDIAN_STONE_FRAGMENT,
    weapon_stone: WEAPON_STONES.DESTRUCTION_STONE_FRAGMENT,
    leapstone: LEAPSTONES.HARMONY_LEAPSTONE,
    rate_up_materials: [RATE_UP_STONES.STAR_BREATH],
  },
  {
    tier: 2,
    armor_stone: ARMOR_STONES.GUARDIAN_STONE,
    weapon_stone: WEAPON_STONES.DESTRUCTION_STONE,
    leapstone: LEAPSTONES.LIFE_LEAPSTONE,
    rate_up_materials: [RATE_UP_STONES.MOON_BREATH],
  },
  {
    tier: 3,
    armor_stone: ARMOR_STONES.GUARDIAN_STONE_CRYSTAL,
    weapon_stone: WEAPON_STONES.DESTRUCTION_STONE_CRYSTAL,
    leapstone: LEAPSTONES.HONOR_LEAPSTONE,
    rate_up_materials: [RATE_UP_STONES.SOLAR_GRACE, RATE_UP_STONES.SOLAR_BLESSING, RATE_UP_STONES.SOLAR_PROTECTION, RATE_UP_STONES.WEAPON_BOOK_1, RATE_UP_STONES.ARMOR_BOOK_1],
  },
  {
    tier: 4,
    armor_stone: ARMOR_STONES.GUARDIAN_STONE_CRYSTAL,
    weapon_stone: WEAPON_STONES.DESTRUCTION_STONE_CRYSTAL,
    leapstone: LEAPSTONES.GREAT_HONOR_LEAPSTONE,
    rate_up_materials: [RATE_UP_STONES.SOLAR_GRACE, RATE_UP_STONES.SOLAR_BLESSING, RATE_UP_STONES.SOLAR_PROTECTION, RATE_UP_STONES.WEAPON_BOOK_1, RATE_UP_STONES.ARMOR_BOOK_1],
  },
];

export const TIERS = ["1", "2", "3", "4"]

export const GEAR_TYPES = ["Weapon", "Armor"]

export const MAX_ENHANCEMENT_LEVEL_FOR_TIER = {
  TIER_1: _.range(1, 16),
  TIER_2: _.range(1, 16),
  TIER_3: _.range(1, 16),
  TIER_4: _.range(1, 16)
}

export const IMAGES = [
  {
    name: "Gold",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/money_4.png"
  },
  {
    name: "Silver",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/etc_14.png"
  },
  {
    name: "Crystals",
    url: "https://lostark.wiki.fextralife.com/file/Lost-Ark/crystals_currencies_lost_ark_wiki_guide.png"
  },
  {
    name: "Mari",
    url: "https://lostarkcodex.com/icons/freindshipnpc_img_24.webp"
  },
  {
    name: "Guardian Stone Fragment",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_251.png",
  },
  {
    name: "Guardian Stone",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_7_16.png",
  },
  {
    name: "Guardian Stone Crystal",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_6_104.png",
  },
  {
    name: "Destruction Stone Fragment",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_250.png",
  },
  {
    name: "Destruction Stone",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_7_15.png",
  },
  {
    name: "Destruction Stone Crystal",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_6_105.png",
  },
  {
    name: "Harmony Leapstone",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_10_25.png",
  },
  {
    name: "Life Leapstone",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_10_24.png",
  },
  {
    name: "Honor Leapstone",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_7_155.png",
  },
  {
    name: "Great Honor Leapstone",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_7_156.png",
  },
  {
    name: "Star Breath",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_7_169.png",
  },
  {
    name: "Moon Breath",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_7_167.png",
  },
  {
    name: "Solar Grace",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_7_161.png",
  },
  {
    name: "Solar Blessing",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_7_162.png",
  },
  {
    name: "Solar Protection",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_7_163.png",
  },
  {
    name: "Metal Book Basic",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_6_222.png",
  },
  {
    name: "Armor Book Basic",
    url: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_6_226.png",
  },
];

export const HONING_COSTS_WEAPON_T3_LOW : Record<number, {gear_shards: number, leapstones: number, silver: number, gold: number}> = {
  1: {
    gear_shards: 138,
    leapstones: 4,
    silver: 15860,
    gold: 0
  },
  2: {
    gear_shards: 138,
    leapstones: 4,
    silver: 16240,
    gold: 0
  },
  3: {
    gear_shards: 198,
    leapstones: 6,
    silver: 16640,
    gold: 0
  },
  4: {
    gear_shards: 198,
    leapstones: 6,
    silver: 17040,
    gold: 0
  },
  5: {
    gear_shards: 198,
    leapstones: 6,
    silver: 17460,
    gold: 0
  },
  6: {
    gear_shards: 198,
    leapstones: 6,
    silver: 17900,
    gold: 0
  },
  7: {
    gear_shards: 258,
    leapstones: 8,
    silver: 18320,
    gold: 120
  },
  8: {
    gear_shards: 258,
    leapstones: 8,
    silver: 18780,
    gold: 120
  },
  9: {
    gear_shards: 258,
    leapstones: 8,
    silver: 19240,
    gold: 120
  },
  10: {
    gear_shards: 320,
    leapstones: 10,
    silver: 19720,
    gold: 120
  },
  11: {
    gear_shards: 320,
    leapstones: 10,
    silver: 20200,
    gold: 120
  },
  12: {
    gear_shards: 320,
    leapstones: 10,
    silver: 20700,
    gold: 120
  },
  13: {
    gear_shards: 380,
    leapstones: 10,
    silver: 21200,
    gold: 120
  },
  14: {
    gear_shards: 380,
    leapstones: 12,
    silver: 21720,
    gold: 120
  },
  15: {
    gear_shards: 380,
    leapstones: 12,
    silver: 22260,
    gold: 120
  },
}

export const HONING_COSTS_WEAPON_T3_MID : Record<number, {gear_shards: number, leapstones: number, silver: number, gold: number}> = {
  1: {
    gear_shards: 358,
    leapstones: 6,
    silver: 27600,
    gold: 300
  },
  2: {
    gear_shards: 358,
    leapstones: 8,
    silver: 28280,
    gold: 300
  },
  3: {
    gear_shards: 358,
    leapstones: 8,
    silver: 28980,
    gold: 300
  },
  4: {
    gear_shards: 516,
    leapstones: 10,
    silver: 29680,
    gold: 300
  },
  5: {
    gear_shards: 516,
    leapstones: 10,
    silver: 30420,
    gold: 300
  },
  6: {
    gear_shards: 516,
    leapstones: 12,
    silver: 31160,
    gold: 320
  },
  7: {
    gear_shards: 672,
    leapstones: 12,
    silver: 31920,
    gold: 320
  },
  8: {
    gear_shards: 672,
    leapstones: 14,
    silver: 32700,
    gold: 320
  },
  9: {
    gear_shards: 672,
    leapstones: 14,
    silver: 33520,
    gold: 320
  },
  10: {
    gear_shards: 830,
    leapstones: 16,
    silver: 34340,
    gold: 320
  },
  11: {
    gear_shards: 830,
    leapstones: 16,
    silver: 35180,
    gold: 330
  },
  12: {
    gear_shards: 830,
    leapstones: 18,
    silver: 36040 ,
    gold: 330
  },
  13: {
    gear_shards: 968,
    leapstones: 18,
    silver: 36940,
    gold: 330
  },
  14: {
    gear_shards: 968,
    leapstones: 20,
    silver: 37840,
    gold: 330
  },
  15: {
    gear_shards: 968,
    leapstones: 20,
    silver: 38760,
    gold: 330
  },
}

export const HONING_COSTS_ARMOR_T3_LOW : Record<number, {gear_shards: number, leapstones: number, silver: number, gold: number}> = {
  1: {
    gear_shards: 82,
    leapstones: 2,
    silver: 11100,
    gold: 0
  },
  2: {
    gear_shards: 82,
    leapstones: 2,
    silver: 11380,
    gold: 0
  },
  3: {
    gear_shards: 82,
    leapstones: 4,
    silver: 11660,
    gold: 0
  },
  4: {
    gear_shards: 120,
    leapstones: 4,
    silver: 11960,
    gold: 0
  },
  5: {
    gear_shards: 120,
    leapstones: 4,
    silver: 12240,
    gold: 0
  },
  6: {
    gear_shards: 120,
    leapstones: 4,
    silver: 12540,
    gold: 0
  },
  7: {
    gear_shards: 156,
    leapstones: 4,
    silver: 12840,
    gold: 70
  },
  8: {
    gear_shards: 156,
    leapstones: 4,
    silver: 13160,
    gold: 70
  },
  9: {
    gear_shards: 156,
    leapstones: 4,
    silver: 13480,
    gold: 70
  },
  10: {
    gear_shards: 192,
    leapstones: 6,
    silver: 13820,
    gold: 70
  },
  11: {
    gear_shards: 192,
    leapstones: 6,
    silver: 14140,
    gold: 70
  },
  12: {
    gear_shards: 192,
    leapstones: 6,
    silver: 14500,
    gold: 70
  },
  13: {
    gear_shards: 228,
    leapstones: 6,
    silver: 14860,
    gold: 70
  },
  14: {
    gear_shards: 228,
    leapstones: 8,
    silver: 15220,
    gold: 70
  },
  15: {
    gear_shards: 228,
    leapstones: 8,
    silver: 15600,
    gold: 70
  },
}

export const HONING_COSTS_ARMOR_T3_MID : Record<number, {gear_shards: number, leapstones: number, silver: number, gold: number}> = {
  1: {
    gear_shards: 216,
    leapstones: 4,
    silver: 19320,
    gold: 160
  },
  2: {
    gear_shards: 216,
    leapstones: 6,
    silver: 19800,
    gold: 160
  },
  3: {
    gear_shards: 216,
    leapstones: 6,
    silver: 20300,
    gold: 170
  },
  4: {
    gear_shards: 310,
    leapstones: 6,
    silver: 20800,
    gold: 170
  },
  5: {
    gear_shards: 310,
    leapstones: 6,
    silver: 21300,
    gold: 170
  },
  6: {
    gear_shards: 310,
    leapstones: 8,
    silver: 21820,
    gold: 170
  },
  7: {
    gear_shards: 404,
    leapstones: 8,
    silver: 22380,
    gold: 170
  },
  8: {
    gear_shards: 404,
    leapstones: 10,
    silver: 22920,
    gold: 170
  },
  9: {
    gear_shards: 404,
    leapstones: 10,
    silver: 23480,
    gold: 170
  },
  10: {
    gear_shards: 498,
    leapstones: 10,
    silver: 24040,
    gold: 170
  },
  11: {
    gear_shards: 498,
    leapstones: 10,
    silver: 24640,
    gold: 170
  },
  12: {
    gear_shards: 498,
    leapstones: 12,
    silver: 25240,
    gold: 170
  },
  13: {
    gear_shards: 592,
    leapstones: 12,
    silver: 25860,
    gold: 170
  },
  14: {
    gear_shards: 592,
    leapstones: 12,
    silver: 26500,
    gold: 170
  },
  15: {
    gear_shards: 592,
    leapstones: 12,
    silver: 27160,
    gold: 170
  },
}


