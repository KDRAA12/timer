import { Button } from "@mui/material";
import { Col, Row } from "antd";
import { FC, useEffect, useState } from "react";

import "./App.css";
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import { textColor } from "./constants";
interface props {
  onClick: () => void;
  title: string;
  isSelected: boolean;
}

const backgroundColors = {
  main: { color: "rgb(0, 208, 132)", time: 1800 },
  short: { color: "rgb(76, 145, 149)", time: 300 },
  long: { color: "rgb(69, 124, 163)", time: 600 },
  flow: { color: "rgb(217, 85, 80)", time: 0 },
};
const CostumButton: FC<props> = ({ onClick, title, isSelected }) => (
  <Button
    onClick={onClick}
    sx={{
      color: textColor,
      hover: "none",
      borderRadius: "0.6rem",
      fontWeight: "500",
      fontSize: "larger",
      border: "transparent",
     textAlign:"center",
      backgroundColor: isSelected ? "rgba(0,0,0,0.26)" : "",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.26)",
      },
    }}
    className="button"
    variant="text"
  >
    {title}
  </Button>
);
const App = () => {
  const [timer, setTimer] = useState<number>(backgroundColors["main"].time);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  let audio = new Audio("/alarmBell.mp3");
  let buttonSound = new Audio("/button-press.wav");

  const [selected, setSelected] = useState<"main" | "long" | "flow" | "short">(
    "main"
  );

  const handleChange = (type: "main" | "short" | "long" | "flow") => {
    console.log(selected, timer !== backgroundColors[selected].time);
    let change = true;
    if (timer !== backgroundColors[selected].time) {
      change = window.confirm(
        "The timer is still running, are you sure you want to switch?"
      );
    }
    if (change) {
      setSelected(type);
      setIsCounting(false);
      setTimer(backgroundColors[type].time);
    }
  };
  useEffect(() => {
    const quit = setInterval(() => {
      isCounting &&
        (selected !== "flow" ? setTimer((_) => _ - 1) : setTimer((_) => _ + 1));
    }, 1000);

    return () => clearInterval(quit);
  }, [isCounting]);

  useEffect(() => {
    if (timer === 0 && selected !== "flow") {
      audio.play();
      handleChange(selected);
    }
  }, [timer]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: backgroundColors[selected].color,
        fontFamily: '"Inter",    Sans-serif !important',
        color: "#2F4858",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="App"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
      >
        <div className="flexSpaceBetweenVertical">
        
            <Row  gutter={16} style={{width:"100%",textAlign:"center"}}>
              <Col xs={12}  sm={12}  md={6}  lg={6} >
              <CostumButton
              title="Promodor"
              isSelected={selected === "main"}
              onClick={() => {
                handleChange("main");
              }}
            />
            
              </Col>
              <Col xs={12}  sm={12}  md={6}  lg={6}>
              <CostumButton
              title="Short Break"
              isSelected={selected === "short"}
              onClick={() => {
                handleChange("short");
              }}
            />
                
              </Col>
              <Col xs={12}  sm={12}  md={6}  lg={6}>
              <CostumButton
              title="Long Break"
              isSelected={selected === "long"}
              onClick={() => {
                handleChange("long");
              }}
            />
                
              </Col>
              <Col xs={12}  sm={12}  md={6}  lg={6}>
                <div style={{textAlign:'center'}}>

                <CostumButton
              title="Flow"
              isSelected={selected === "flow"}
              onClick={() => {
                handleChange("flow");
              }}
            />    
                </div>
              </Col>
              
            </Row>
            
          <div>
            <p
              style={{
                fontSize: "5rem",
                fontWeight: "bold",
                textAlign: "center",
                letterSpacing: "2",
                color: textColor,
              }}
            >
              {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
              {timer % 60}
            </p>
          </div>
          <div>
            <button
              style={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "1rem",
                boxShadow: "rgb(235 235 235) 0rem 0.6rem 0rem",
                width: "10rem",
                height:"4rem",
                fontSize: "1.4rem",
                padding: "1rem",
                color: backgroundColors[selected].color,
              }}
              onClick={() => {
                buttonSound.play();
                setIsCounting(!isCounting);
              }}
            >
              {isCounting ? "PAUSE" : "START"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
