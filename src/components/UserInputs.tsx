import * as constants from "../constants";
import MarketValues from "./MarketValues";
import Styled from "styled-components"
import { user_inputs } from "../types";

const UserInputWrapper = Styled.div `
  .selectWrapper {
    display: flex;
    padding: 10px 0px;
  }
  .selectBox {
    margin-top: 3px;
    margin-left: 10px;
  }
`

export interface UserInputsProps {
  userInputs: user_inputs
  setUserInputs: any
}

const determineTierName = (tier : string) => {
  if (tier === "3") {
    return "Tier 3 - Low"
  } else if (tier === "4") {
    return "Tier 3 - Mid"
  } else {
    return `Tier ${tier}`
  }
}

const UserInputs = ({userInputs, setUserInputs} : UserInputsProps) => {
  return (
    <UserInputWrapper>
      <h2>User Inputs</h2>
      <div className="selectWrapper">
        <label htmlFor="tiers">Choose a tier</label>
        <select
          id="tiers"
          className="selectBox"
          name="tiers"
          onChange={(e) => {
            const newUserGearInputs = {...userInputs}
            newUserGearInputs.user_gear_inputs.tier = parseInt(e.target.value)
            setUserInputs(newUserGearInputs)
          }}
        >
          {constants.TIERS.map((tier) => (
            <option key={tier} value={tier}>{determineTierName(tier)}</option>
          ))}
        </select>
      </div>
      <div className="selectWrapper">
      <label htmlFor="equipmentType">Choose equipment type</label>
      <select
        id="equipmentType"
        className="selectBox"
        name="equipmentType"
        onChange={(e) => {
          const newUserGearInputs = {...userInputs}
          newUserGearInputs.user_gear_inputs.equipment_type = e.target.value
          setUserInputs(newUserGearInputs)
        }}
      >
        {constants.GEAR_TYPES.map((gearType) => (
          <option key={gearType} value={gearType}>{gearType}</option>
        ))}
      </select>
      </div>
      <div className="selectWrapper">
        <label htmlFor="itemLevel">Choose desired item level</label>
        <select
          id="itemLevel"
          className="selectBox"
          name="itemLevel"
          onChange={(e) => {
            const newUserGearInputs = {...userInputs}
            newUserGearInputs.user_gear_inputs.desired_level = parseInt(e.target.value)
            setUserInputs(newUserGearInputs)
          }}
        >
          {constants.MAX_ENHANCEMENT_LEVEL_FOR_TIER[
            `TIER_${userInputs.user_gear_inputs.tier}` as keyof typeof constants.MAX_ENHANCEMENT_LEVEL_FOR_TIER
          ].map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
      <div className="selectWrapper">
        <label>Gold per 95 crystals</label>
        <img style={{marginLeft: 5, marginTop:-5}} src={constants.IMAGES[2].url} alt={"crystal"}></img>
        <input style={{marginLeft: 20, width: 70, fontSize: 20, textAlign: "center", fontWeight:"bold"}} className="goldCrystalRate" type="number" value={userInputs.user_gear_inputs.crystal_rate}
        onChange={(e) => {
          const newUserGearInputs = {...userInputs}
            newUserGearInputs.user_gear_inputs.crystal_rate = parseInt(e.target.value)
            setUserInputs(newUserGearInputs)
        }}/>
      </div>

      <MarketValues userInputs={userInputs} setUserInputs={setUserInputs}/>
    </UserInputWrapper>
  );
};

export default UserInputs;
