import logo from "./logo.svg";
import "./App.css";
import Spline from "@splinetool/react-spline";
import { useRef, useState } from "react";
import Container from "./components/Container";
import Tank from "./components/Tank";
import Globe from "./components/Globe";
import Pressure from "./components/Pressure";
import Contact from "./components/Contact";

function App() {
  const logo = useRef();
  const bridge = useRef();
  const tank = useRef();
  const ship = useRef();
  const globe = useRef();
  const plane = useRef();
  const [container, setContainer] = useState(false);
  const [tankCon, setTankCon] = useState(false);
  const [aboutCon, setAboutCon] = useState(false);
  const [pressureCon, setPressureCon] = useState(false);
  const [contactCon, setContactCon] = useState(false);

  function onMouseDown(e) {
    console.log(e.target.name);
    if (e.target.name === "Water Jet") {
      setContainer((container) => !container);
    }
    if (e.target.name === "Cleaning") {
      setTankCon((tankCon) => !tankCon);
    }
    if (e.target.name === "Group") {
      setAboutCon((aboutCon) => !aboutCon);
    }
    if (e.target.name === "Pressure") {
      setPressureCon((pressureCon) => !pressureCon);
    }
    if (e.target.name === "Contact") {
      setContactCon((contactCon) => !contactCon);
    }
  }

  function selectedObject(e) {
    switch (e.target.id) {
      case "water-jet":
        if (container === true) {
          return;
        }
        bridge.current.emitEvent("mouseDown");
        bridge.current.emitEvent("mouseUp");
        setContainer(() => !container);
        break;
      case "cleaning":
        if (tankCon === true) {
          return;
        }
        tank.current.emitEvent("mouseDown");
        setTankCon(() => !tankCon);
        break;
      case "about":
        if (aboutCon === true) {
          return;
        }

        globe.current.emitEvent("mouseDown");
        setAboutCon(() => !aboutCon);
        break;
      case "pressure":
        if (pressureCon === true) {
          return;
        }
        ship.current.emitEvent("mouseDown");
        setPressureCon(() => !pressureCon);

        break;
      case "contact":
        if (contactCon === true) {
          return;
        }
        plane.current.emitEvent("mouseDown");
        setContactCon(() => !contactCon);

        break;
      default:
        return;
    }
  }

  function onLoad(spline) {
    const logoObj = spline.findObjectByName("Logo");
    const bridgeObj = spline.findObjectByName("Water Jet");
    const tankObj = spline.findObjectByName("Cleaning");
    const globeObj = spline.findObjectByName("Group");
    const shipObj = spline.findObjectByName("Pressure");
    const planeObj = spline.findObjectByName("Contact");

    logo.current = logoObj;
    bridge.current = bridgeObj;
    tank.current = tankObj;
    ship.current = shipObj;
    globe.current = globeObj;
    plane.current = planeObj;
  }

  return (
    <div className="relative">
      {container ? (
        <Container
          object={bridge}
          setContainer={setContainer}
          container={container}
        />
      ) : null}
      {tankCon ? (
        <Tank object={tank} setContainer={setTankCon} container={tankCon} />
      ) : null}
      {aboutCon ? (
        <Globe object={globe} setContainer={setAboutCon} container={aboutCon} />
      ) : null}
      {pressureCon ? (
        <Pressure
          object={ship}
          setContainer={setPressureCon}
          container={pressureCon}
        />
      ) : null}

      {contactCon ? (
        <Contact
          object={plane}
          setContainer={setContactCon}
          container={contactCon}
        />
      ) : null}

      <div>
        <div className="z-50 absolute flex flex-col gap-3 left-8 top-mid">
          <div
            id="water-jet"
            className="h-2 w-2 bg-slate-500 rounded-xl dot-navigate"
            onClick={selectedObject}
          ></div>
          <div
            id="cleaning"
            className="h-2 w-2 bg-slate-500 rounded-xl dot-navigate"
            onClick={selectedObject}
          ></div>
          <div
            id="about"
            className="h-2 w-2 bg-slate-500 rounded-xl dot-navigate"
            onClick={selectedObject}
          ></div>
          <div
            id="pressure"
            className="h-2 w-2 bg-slate-500 rounded-xl dot-navigate"
            onClick={selectedObject}
          ></div>
          <div
            id="contact"
            className="h-2 w-2 bg-slate-500 rounded-xl dot-navigate"
            onClick={selectedObject}
          ></div>
        </div>
      </div>
      <Spline
        onLoad={onLoad}
        className="view"
        scene="https://prod.spline.design/WxnbmrQKO7JgyKht/scene.splinecode"
        onMouseDown={onMouseDown}
      />
    </div>
  );
}

export default App;
