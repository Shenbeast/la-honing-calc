import React, { useState, useEffect } from "react";
import * as constants from "../constants";
import * as simConstants from "../honingSims";
import {
  armor_stone,
  honings_object,
  honing_object_with_cost,
  leapstone,
  rate_up_stone,
  selected_materials,
  user_inputs,
  weapon_stone,
} from "../types";
import Styled from "styled-components";

const MaterialsTableWrapper = Styled.div`
  table, th, td {
    border:1px solid white;
    border-collapse: collapse;
    text-align: center;
  }
  table {
    margin-top: 30px;
  }
  .tableHeading {
    padding: 12px;
  }
  .honingDescription {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  .honingName {
    align-self: center;
  }
  .honingImage {
    align-self: center;
    margin-left: 12px;
  }
  margin-top: 31px;
`;

export interface calculationsProps {
  userInputs: user_inputs;
}

const Calculations = ({ userInputs }: calculationsProps) => {
  const desiredLevelString = String(userInputs.user_gear_inputs.desired_level);
  const honingMats: honings_object[] = simConstants.HONINGS[desiredLevelString];
  const [cheapestMarketMethod, setCheapestMarketMethod] =
    useState<honings_object>();
  const [cheapestMariMethod, setCheapestMariMethod] =
    useState<honings_object>();
  const [defaultMarketGold, setDefaultMarketGold] = useState<number>(Infinity);
  const [defaultMariGold, setDefaultMariGold] = useState<number>(Infinity);
  const [minimumMarketGold, setMinimumMarketGold] = useState<number>(Infinity);
  const [minimumMariGold, setMinimumMariGold] = useState<number>(Infinity);
  const currentEquipmentType = userInputs.user_gear_inputs.equipment_type;
  const costs = userInputs.selected_materials;
  const tier = userInputs.user_gear_inputs.tier;

  const getMariCost = (
    numberShards: number,
    stone: armor_stone | weapon_stone | rate_up_stone | leapstone,
    isBundled: boolean
  ) => {
    if (stone.mari_amount && stone.mari_crystal) {
      const goldCrystalCost =
        (userInputs.user_gear_inputs.crystal_rate / 95) *
        (stone.mari_crystal / stone.mari_amount);
      const mariCost = goldCrystalCost * numberShards;
      const defaultCost = stone.gold * numberShards;
      if (mariCost < defaultCost) {
        return isBundled ? mariCost / 10 : mariCost;
      } else {
        return isBundled ? defaultCost / 10 : defaultCost;
      }
    } else {
      const defaultCost = stone.gold * numberShards;
      return isBundled ? defaultCost / 10 : defaultCost;
    }
  };

  const calculateCost = (
    honingMat: honings_object,
    costs: selected_materials,
    equipmentType: string,
    desiredLevel: number,
    mari: boolean
  ) => {
    let honingCost = 0;
    if (equipmentType === "Weapon") {
      const honingCosts =
        tier === 3
          ? constants.HONING_COSTS_WEAPON_T3_LOW[desiredLevel]
          : constants.HONING_COSTS_WEAPON_T3_MID[desiredLevel];
      const shardCost = !mari
        ? (honingCosts.gear_shards * costs.weapon_stone.gold) / 10
        : getMariCost(honingCosts.gear_shards, costs.weapon_stone, true);
      const leapstoneCost = !mari
        ? honingCosts.leapstones * costs.leapstone.gold
        : getMariCost(honingCosts.leapstones, costs.leapstone, false);
      const goldHoneCost = honingCosts.gold;
      honingCost = honingCost + shardCost + leapstoneCost + goldHoneCost;
    } else {
      const honingCosts =
        tier === 3
          ? constants.HONING_COSTS_ARMOR_T3_LOW[desiredLevel]
          : constants.HONING_COSTS_WEAPON_T3_MID[desiredLevel];
      const shardCost = !mari
        ? (honingCosts.gear_shards * costs.armor_stone.gold) / 10
        : getMariCost(honingCosts.gear_shards, costs.armor_stone, true);
      const leapstoneCost = !mari
        ? honingCosts.leapstones * costs.leapstone.gold
        : getMariCost(honingCosts.leapstones, costs.leapstone, false);
      const goldHoneCost = honingCosts.gold;
      honingCost = honingCost + shardCost + leapstoneCost + goldHoneCost;
    }
    honingMat.rate_up_materials.forEach((rate_up_material) => {
      costs.rate_up_materials.forEach((cost) => {
        if (cost.name.toLowerCase().includes(rate_up_material.name)) {
          if (
            !(equipmentType === "Weapon" && cost.name === "Armor Book Basic") &&
            !(equipmentType === "Armor" && cost.name === "Metal Book Basic")
          ) {
            const rate_up_material_cost = !mari
              ? rate_up_material.amount * cost.gold
              : getMariCost(rate_up_material.amount, cost, false);
            honingCost += rate_up_material_cost;
          }
        }
      });
    });
    return honingCost * honingMat.average;
  };

  useEffect(() => {
    const honingMarketCosts: honing_object_with_cost[] = [];
    const honingMariCosts: honing_object_with_cost[] = [];
    let baselineFound = false;
    honingMats.forEach((honingMat) => {
      const honingMarketCost = calculateCost(
        honingMat,
        costs,
        userInputs.user_gear_inputs.equipment_type,
        userInputs.user_gear_inputs.desired_level,
        false
      );
      const honingMariCost = calculateCost(
        honingMat,
        costs,
        userInputs.user_gear_inputs.equipment_type,
        userInputs.user_gear_inputs.desired_level,
        true
      );
      if (!baselineFound) {
        honingMat.rate_up_materials.forEach((rate_up_material) => {
          if (rate_up_material.amount !== 0) {
            return;
          }
        });
        baselineFound = true;
        setDefaultMarketGold(honingMarketCost);
        setDefaultMariGold(honingMariCost);
      }
      honingMarketCosts.push({
        honings_object: honingMat,
        honing_cost: honingMarketCost,
      });
      honingMariCosts.push({
        honings_object: honingMat,
        honing_cost: honingMariCost,
      });
    });
    const minimumMarketHone = honingMarketCosts.reduce(function (prev, curr) {
      return prev.honing_cost < curr.honing_cost ? prev : curr;
    });
    const minimumMariHone = honingMariCosts.reduce(function (prev, curr) {
      return prev.honing_cost < curr.honing_cost ? prev : curr;
    });
    setCheapestMarketMethod(minimumMarketHone.honings_object);
    setCheapestMariMethod(minimumMariHone.honings_object);
    setMinimumMarketGold(minimumMarketHone.honing_cost);
    setMinimumMariGold(minimumMariHone.honing_cost);
  }, [userInputs]);

  const determineImage = (itemToFind: string) => {
    let imageUrl = "";
    constants.IMAGES.forEach((image) => {
      if (
        image.name.toLowerCase().includes(itemToFind.toLowerCase()) &&
        !(
          currentEquipmentType === "Weapon" && image.name === "Armor Book Basic"
        ) &&
        !(currentEquipmentType === "Armor" && image.name === "Metal Book Basic")
      ) {
        imageUrl = image.url;
      }
    });
    return imageUrl;
  };

  const determineHoningImage = (itemToFind: string) => {
    let imageUrl = "";
    const armorShard = userInputs.selected_materials.armor_stone.name;
    const weaponShard = userInputs.selected_materials.weapon_stone.name;
    const leapstone = userInputs.selected_materials.leapstone.name;
    if (itemToFind === "gear_shards") {
      if (currentEquipmentType === "Weapon") {
        constants.IMAGES.forEach((image) => {
          if (image.name === weaponShard) {
            imageUrl = image.url;
          }
        });
      } else {
        constants.IMAGES.forEach((image) => {
          if (image.name === armorShard) {
            imageUrl = image.url;
          }
        });
      }
    }
    if (itemToFind === "leapstones") {
      constants.IMAGES.forEach((image) => {
        if (image.name === leapstone) {
          imageUrl = image.url;
        }
      });
    } else {
      constants.IMAGES.forEach((image) => {
        if (image.name.toLowerCase() === itemToFind.toLowerCase()) {
          imageUrl = image.url;
        }
      });
    }
    return imageUrl;
  };
  const determineItemName = (itemToFind: string) => {
    if (itemToFind === "gear_shards") {
      if (currentEquipmentType === "Weapon") {
        return userInputs.selected_materials.weapon_stone.name;
      } else {
        return userInputs.selected_materials.armor_stone.name;
      }
    }
    if (itemToFind === "leapstones") {
      return userInputs.selected_materials.leapstone.name;
    }
    if (itemToFind === "gold") {
      return "Gold";
    }
    if (itemToFind === "silver") {
      return "Silver";
    }
    if (itemToFind === "grace") {
      return userInputs.selected_materials.rate_up_materials[0].name;
    }
    if (itemToFind === "blessing") {
      return userInputs.selected_materials.rate_up_materials[1].name;
    }
    if (itemToFind === "protection") {
      return userInputs.selected_materials.rate_up_materials[2].name;
    }
    if (itemToFind === "book") {
      if (currentEquipmentType === "Weapon") {
        return userInputs.selected_materials.rate_up_materials[3].name;
      } else {
        return userInputs.selected_materials.rate_up_materials[4].name;
      }
    }
  };

  const renderHoningTable = () => {
    let honingCosts;
    const formattedHoningCosts = [];
    if (currentEquipmentType === "Weapon") {
      honingCosts =
        tier === 3
          ? constants.HONING_COSTS_WEAPON_T3_LOW[
              userInputs.user_gear_inputs.desired_level
            ]
          : constants.HONING_COSTS_WEAPON_T3_MID[
              userInputs.user_gear_inputs.desired_level
            ];
    } else {
      honingCosts =
        tier === 3
          ? constants.HONING_COSTS_ARMOR_T3_LOW[
              userInputs.user_gear_inputs.desired_level
            ]
          : constants.HONING_COSTS_ARMOR_T3_MID[
              userInputs.user_gear_inputs.desired_level
            ];
    }
    for (const honingMaterial in honingCosts) {
      formattedHoningCosts.push({
        name: honingMaterial,
        amount: honingCosts[honingMaterial as keyof typeof honingCosts],
      });
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Honing Material</th>
            <th className="tableHeading">Amount consumed</th>
          </tr>
        </thead>
        <tbody>
          {formattedHoningCosts.map((formattedHoningCost) => {
            return (
              <tr key={formattedHoningCost.name}>
                <td className="honingDescription">
                  <span className="honingName">
                    {determineItemName(formattedHoningCost.name)}
                  </span>
                  <img
                    className="honingImage"
                    src={determineHoningImage(formattedHoningCost.name)}
                    alt={formattedHoningCost.name}
                  />
                </td>
                <td>{formattedHoningCost.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderRateUpTable = (cheapestMethod: honings_object) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Rateup Material</th>
            <th className="tableHeading">Amount consumed</th>
          </tr>
        </thead>
        <tbody>
          {cheapestMethod.rate_up_materials.map((material) => {
            return (
              <tr key={material.name}>
                <td className="honingDescription">
                  <span className="honingName">
                    {determineItemName(material.name)}
                  </span>
                  <img
                    className="honingImage"
                    src={determineImage(material.name)}
                    alt={material.name}
                  />
                </td>
                <td>{material.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <MaterialsTableWrapper>
      {cheapestMarketMethod &&
        defaultMarketGold &&
        cheapestMariMethod &&
        defaultMariGold && (
          <div>
            <span>
              The default market method costs{" "}
              {defaultMarketGold.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}{" "}
              Gold
            </span>
            <br />
            <span>
              The cheapest market method costs{" "}
              <b>{minimumMarketGold.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}</b>{" "}
              Gold
            </span>
            <br />
            {minimumMarketGold !== defaultMarketGold && (
              <>
                <span>
                  The cheapest market method saves{" "}
                  {(defaultMarketGold - minimumMarketGold).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }
                  )}{" "}
                  Gold which represents a{" "}
                  <b>
                    {(
                      (100 * (defaultMarketGold - minimumMarketGold)) /
                      defaultMarketGold
                    ).toFixed(2)}
                  </b>
                  % saving
                </span>
                <br />
              </>
            )}
            <span>
              This method takes an average of{" "}
              {cheapestMarketMethod.average.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              times to succeed
            </span>
            <br />
            <br />
            <span>
              The default mari method costs{" "}
              {defaultMariGold.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}{" "}
              Gold
            </span>
            <br />
            <span>
              The cheapest mari method costs{" "}
              <b>{minimumMariGold.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}</b>{" "}
              Gold
            </span>
            <br />
            {minimumMariGold !== defaultMariGold && (
              <>
                <span>
                  The cheapest mari method saves{" "}
                  {(defaultMariGold - minimumMariGold).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }
                  )}{" "}
                  Gold which represents a{" "}
                  <b>
                    {(
                      (100 * (defaultMariGold - minimumMariGold)) /
                      defaultMariGold
                    ).toFixed(2)}
                    %
                  </b>{" "}
                  saving
                </span>
                <br />
              </>
            )}
            <span>
              This method takes an average of{" "}
              {cheapestMariMethod.average.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              times to succeed
            </span>
            <br /><br />  
            <span>
              Each honing attempt will consume the following resources
            </span>
            <div>
              <h3>Base upgrade materials per attempt</h3>
              {renderHoningTable()}
              <h3>Rate up materials per market attempt</h3>
              {renderRateUpTable(cheapestMarketMethod)}
              <h3>Rate up materials per mari attempt</h3>
              {renderRateUpTable(cheapestMariMethod)}
            </div>
            <br />
          </div>
        )}
    </MaterialsTableWrapper>
  );
};

export default Calculations;
