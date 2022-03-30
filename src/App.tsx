import { useState } from "react";
import UserInputs from "./components/UserInputs";
import Heading from "./components/Heading";
import Calculations from "./components/Calculations";
import Styled from "styled-components";
import { selected_materials, user_gear_inputs, user_inputs } from "./types";
import * as constants from "./constants";

const AppWrapper = Styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
  "header  header  header"
  "marketValues content content"
  "footer  footer  footer";
  background-color: #fff;
  color: #444;
  .box {
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    padding: 50px;
    font-size: 150%;
  }
  .marketValues {
    grid-area: marketValues
  }
  .content {
    grid-area: content;
  }
  
  .header {
    grid-area: header;
  }
  
  .footer {
    grid-area: footer;
  }
  img {
    width: 48px;
    height: 48px;
  }
`;

function App() {
  // const [tier, setTier] = useState<number>(1);
  // const [equipmentType, setEquipmentType] = useState<string>("Weapon");
  const initialUserGearInput: user_gear_inputs = {
    tier: 4,
    equipment_type: "Weapon",
    desired_level: 1,
    crystal_rate: 500,
  };
  const initialSelectedMaterials: selected_materials = {
    armor_stone: constants.ARMOR_STONES.GUARDIAN_STONE_FRAGMENT,
    weapon_stone: constants.WEAPON_STONES.DESTRUCTION_STONE_FRAGMENT,
    rate_up_materials: [constants.RATE_UP_STONES.STAR_BREATH],
    leapstone: constants.LEAPSTONES.HARMONY_LEAPSTONE,
  };
  const [userInputs, setUserInputs] = useState<user_inputs>({
    user_gear_inputs: initialUserGearInput,
    selected_materials: initialSelectedMaterials,
  });
  return (
    <AppWrapper>
      <div className="box header">
        <Heading />
      </div>
      <div className="box marketValues">
        <UserInputs userInputs={userInputs} setUserInputs={setUserInputs} />
      </div>
      <div className="box content">
        {userInputs.user_gear_inputs.tier > 2 && (
          <Calculations userInputs={userInputs} />
        )}
        {userInputs.user_gear_inputs.tier < 3 && (
          <span>Probably not gonna bother tbh</span>
        )}
      </div>
      <div className="box footer"></div>
    </AppWrapper>
  );
}

export default App;
