import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import "./App.css";
import ToolsV2 from "./toolsv2/ToolsV2";
import ToolsV3 from "./toolsv3/ToolsV3";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function App() {
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "v2", value: "1" },
    { name: "v3", value: "2" },
  ];
  return (
    <Container className="App">
      <h1>Uniswap Tools</h1>
      <ButtonGroup toggle className="version-selector">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="primary"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      {radioValue === "1" && <ToolsV2 />}
      {radioValue === "2" && <ToolsV3 />}
    </Container>
  );
}
