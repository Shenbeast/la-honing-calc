import { useEffect } from "react";
import * as constants from "../constants";
import {
  armor_stone,
  weapon_stone,
  rate_up_stone,
  rate_up_materials,
  tier_object,
  gold,
  selected_materials,
  leapstone,
  user_inputs
} from "../types";
import Styled from 'styled-components'
import ReactTooltip from "react-tooltip";

const MarketValuesWrapper = Styled.div`
table, th, td {
  border:1px solid white;
  border-collapse: collapse;
}
margin-top: 15px;
`

const RenderStoneWrapper = Styled.tr`
  .goldCost, .goldCrystalCost {
    max-width: 5.5rem;
    margin-bottom: 2px;
    font-weight: bold;
    padding: 8px;
    font-size: 20px;
    text-align: center;
  }
  .goldWrapper {
    padding: 15px;
  }
  .stoneDescription {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  .stoneName{
    align-self: center;
  }
  .stoneImage{
    align-self: center;
    margin-left: 12px;
  }
`

export interface MarketValuesProps {
  userInputs: user_inputs
  setUserInputs: any,
}


const MarketValues = ({userInputs, setUserInputs} : MarketValuesProps) => {

  useEffect(() => {
    const displayedMarketValues: tier_object = constants.MARKET_VALUES.filter(
      (marketValue) => {
        return marketValue.tier === userInputs.user_gear_inputs.tier;
      }
    )[0];
    const { armor_stone, weapon_stone, rate_up_materials, leapstone } =
      displayedMarketValues;
    const marketValues : selected_materials = { armor_stone, weapon_stone, rate_up_materials, leapstone };
    const newUserInputs = {...userInputs}
    newUserInputs.selected_materials = marketValues
    setUserInputs(newUserInputs)
  }, [userInputs.user_gear_inputs.tier])

  const determineImage = (itemToFind: string) => {
    const imageUrl = constants.IMAGES.find(
      (image) => image.name === itemToFind
    )?.url;
    return imageUrl;
  };

  const {selected_materials : selectedMaterials} = userInputs

  const saveNewCost = (stoneToFind: armor_stone | weapon_stone | rate_up_stone | leapstone, newGoldValue: gold, mari: boolean) => {
    if (selectedMaterials) {
      for (const category in selectedMaterials) {
        if (category === "armor_stone" || category === "weapon_stone" || category === "leapstone") {
          if (selectedMaterials[category].name === stoneToFind.name) {
            const newUserInputs = {...userInputs}
            const materialToUpdate = newUserInputs.selected_materials[category]
            if (mari && materialToUpdate.mari_crystal && materialToUpdate.mari_amount) {
              materialToUpdate.gold_crystal = materialToUpdate.mari_crystal / materialToUpdate.mari_amount * userInputs.user_gear_inputs.crystal_rate / 95
            } else {
              materialToUpdate.gold = newGoldValue
            }
            setUserInputs(newUserInputs)
          }
        }
        if (category === "rate_up_materials") {
          selectedMaterials[category].forEach((rate_up_material : rate_up_stone, index) => {
            if (rate_up_material.name === stoneToFind.name) {
              const newUserInputs = {...userInputs}
              const materialToUpdate = newUserInputs.selected_materials[category][index]
              if (mari && materialToUpdate.mari_crystal && materialToUpdate.mari_amount) {
                materialToUpdate.gold_crystal = materialToUpdate.mari_crystal / materialToUpdate.mari_amount * userInputs.user_gear_inputs.crystal_rate / 95
              } else {
                materialToUpdate.gold = newGoldValue
              }
              setUserInputs(newUserInputs)
            }
          })
        }
      }
    }
  }

  const renderEquipmentStone = (
    stone: armor_stone | weapon_stone | rate_up_stone | leapstone
  ) => {
    return (
      <RenderStoneWrapper key={stone.name}>
        <td className="stoneDescription">
          <span className="stoneName">{stone.name}</span>
          <img  className="stoneImage" src={determineImage(stone.name)} alt={stone.name} />
        </td>
        <td className="goldWrapper">
        <input className="goldCost" type="number" value={stone.gold} onChange={(e) => saveNewCost(stone, parseInt(e.target.value), false)}/>
        </td>
        <td className="goldWrapper">
        <input disabled={true} className="goldCrystalCost" type="number" value={(stone.mari_crystal && stone.mari_amount) ? ((stone.mari_crystal / stone.mari_amount * userInputs.user_gear_inputs.crystal_rate) / 95).toFixed(2) : ""}/>
        </td>
      </RenderStoneWrapper>
    );
  };

  const renderRateUpStones = (rateUpMaterials: rate_up_materials) => {
    return rateUpMaterials.map((rateUpMaterial) => {
      return renderEquipmentStone(rateUpMaterial);
    });
  };

  return (
    <MarketValuesWrapper>
      <table>
        <thead>
        <tr>
          <th>Honing Material</th>
          <th data-tip data-for="goldInput"><img src={determineImage("Gold")} alt="gold"/></th>
          <th data-tip data-for="mariInput"><img src={determineImage("Mari")} alt="mari"/></th>
        </tr>
        </thead>
        <tbody>
        {userInputs && renderEquipmentStone(userInputs.selected_materials.armor_stone)}
        {userInputs && renderEquipmentStone(userInputs.selected_materials.weapon_stone)}
        {userInputs && renderEquipmentStone(userInputs.selected_materials.leapstone)}
        {userInputs && renderRateUpStones(userInputs.selected_materials.rate_up_materials)}
        </tbody>
      </table>
      <ReactTooltip id="goldInput" place="top" effect="solid">
            Input current market price in gold
      </ReactTooltip>
      <ReactTooltip id="mariInput" place="top" effect="solid">
        The cheaper of market vs mari will be used for mari calc
      </ReactTooltip>
    </MarketValuesWrapper>
  );
};

export default MarketValues;
