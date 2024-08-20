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

  const handleMouseOver = (e) => {
    const object = e.target;
    console.log(`ETARGET: ${object}`);
    object.material.color.set(0xff0000); // Change color to red when hovered
  };

  function onMouseDown(e) {
    console.log(e.target.name);
    if (e.target.name === "Water Jet (Bridge)") {
      setContainer((container) => !container);
      console.log("CLICKED");
    }
    if (e.target.name === "Cleaning (Tank)") {
      setTankCon((tankCon) => !tankCon);
      console.log("CLICKED");
    }
    if (e.target.name === "Group") {
      setAboutCon((aboutCon) => !aboutCon);
      console.log("CLICKED");
    }
    if (e.target.name === "Pressure (Ship)") {
      setPressureCon((pressureCon) => !pressureCon);
      console.log("CLICKED");
    }
    if (e.target.name === "Contact (Plane)") {
      setContactCon((contactCon) => !contactCon);
    }
  }

  function selectedObject(e) {
    console.log(e.target.id);
    switch (e.target.id) {
      case "water-jet":
        if (container === true) {
          console.log("CLICKED");
          return;
        }
        bridge.current.emitEvent("mouseDown");
        // bridge.current.emitEvent("mouseUp");
        setContainer(() => !container);
        setTankCon(() => false);
        setAboutCon(() => false);
        setPressureCon(() => false);
        setContactCon(() => false);
        break;
      case "cleaning":
        if (tankCon === true) {
          return;
        }
        tank.current.emitEvent("mouseDown");
        setTankCon(() => !tankCon);
        setContainer(() => false);
        setAboutCon(() => false);
        setPressureCon(() => false);
        setContactCon(() => false);
        break;
      case "about":
        if (aboutCon === true) {
          return;
        }

        globe.current.emitEvent("mouseDown");
        setAboutCon(() => !aboutCon);
        setContainer(() => false);
        setTankCon(() => false);
        setPressureCon(() => false);
        setContactCon(() => false);
        break;
      case "pressure":
        if (pressureCon === true) {
          return;
        }
        ship.current.emitEvent("mouseDown");
        setPressureCon(() => !pressureCon);
        setContainer(() => false);
        setTankCon(() => false);
        setAboutCon(() => false);
        setContactCon(() => false);

        break;
      case "contact":
        if (contactCon === true) {
          return;
        }
        plane.current.emitEvent("mouseDown");
        setContactCon(() => !contactCon);
        setContainer(() => false);
        setTankCon(() => false);
        setPressureCon(() => false);
        setAboutCon(() => false);

        break;
      default:
        return;
    }
  }

  function onLoad(spline) {
    const logoObj = spline.findObjectByName("Logo");
    const bridgeObj = spline.findObjectByName("Water Jet (Bridge)");
    const tankObj = spline.findObjectByName("Cleaning (Tank)");
    const globeObj = spline.findObjectByName("Group");
    const shipObj = spline.findObjectByName("Pressure (Ship)");
    const planeObj = spline.findObjectByName("Contact (Plane)");

    logo.current = logoObj;
    bridge.current = bridgeObj;
    tank.current = tankObj;
    ship.current = shipObj;
    globe.current = globeObj;
    plane.current = planeObj;
    // console.log(planeObj);

    // Add hover event listeners
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
        onMouseHover={handleMouseOver}
      />
    </div>
  );
}

export default App;
