export type tier = number;
export type gold = number;
export type rate_up_bonus = number

export interface armor_stone {
  name: string;
  tier: tier;
  gold: gold;
  gold_crystal: number,
  mari_amount: number,
  mari_crystal: number
}

export interface weapon_stone {
  name: string;
  tier: tier;
  gold: gold;
  gold_crystal: number,
  mari_amount: number,
  mari_crystal: number
}

export interface leapstone {
  name: string;
  tier: tier;
  gold: gold;
  gold_crystal?: number,
  mari_amount?: number,
  mari_crystal?: number
}


export interface rate_up_stone {
  name: string;
  tier: tier;
  gold: gold;
  rate_up_bonus: rate_up_bonus;
  gold_crystal?: number,
  mari_amount?: number,
  mari_crystal?: number
}

export type rate_up_materials = rate_up_stone[]

export interface tier_object {
  tier: tier;
  armor_stone: armor_stone
  weapon_stone: weapon_stone
  leapstone: leapstone
  rate_up_materials: rate_up_materials
}

export interface selected_materials {
  armor_stone: armor_stone
  weapon_stone: weapon_stone
  rate_up_materials: rate_up_materials
  leapstone: leapstone
}

export interface user_gear_inputs {
  tier: tier;
  equipment_type: string;
  desired_level: number;
  crystal_rate: number;
}


export interface user_inputs {
  user_gear_inputs: user_gear_inputs
  selected_materials: selected_materials;
}

export interface honing_object {
  name: string;
  amount: number; 
}

export interface honings_object {
  rate_up_materials: honing_object[]
  average: number;
}

export interface honing_object_with_cost {
  honings_object: honings_object;
  honing_cost: number;
}
