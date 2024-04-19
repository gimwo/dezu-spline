import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";

function Container({ object, setContainer, container }) {
  function handleClick() {
    object.current.emitEventReverse("mouseDown");
    // object.current.emitEvent("mouseUp");
    setContainer(() => !container);
  }

  useGSAP(() => {
    gsap.fromTo(
      "#container",
      { translateX: -100, opacity: 0 },
      { translateX: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
    );
  });
  // useEffect(() => {
  //   const bridgeObj = spline.findObjectByName("Water Jet");
  //   object.current = bridgeObj;
  // }, []);

  return (
    <div
      id="container"
      className={
        "absolute bg-gradient-to-r from-gray-900 to to-transparent h-[100vh] w-[50vw] top-0 z-10"
      }
    >
      <div className="flex flex-col pt-72 px-32 h-full w-[50vw] justify-center items-start">
        <h2
          className="text-red-600 border-b-inherit go-back-btn mb-4"
          onClick={handleClick}
        >
          Go back
        </h2>
        <h2 className="text-white text-6xl">Water Jet.</h2>
        <p className="text-white text-xs pt-3">
          Elegant cleaning lorem ipsum dolor sclere. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
    </div>
  );
}

export default Container;
