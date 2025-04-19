import { useState } from "react";

function HoverFeatureItem({ icon, en, es }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white dark:bg-gray-800 backdrop-blur-sm shadow-md rounded-lg px-4 py-3 transition-all duration-300 flex items-start gap-3 w-full max-w-3xl mx-auto"
    >
      {/* Icon */}
      <span className="text-xl mt-1">{icon}</span>

      {/* Text Container */}
      <div className="relative w-full min-h-[4rem]">
        {/* English Layer */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <p>{en}</p>
        </div>

        {/* Spanish Layer */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out delay-100 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p>{es}</p>
        </div>

        {/* Ghost layer to lock height */}
        <div className="opacity-0 pointer-events-none">
          <p>{en.length > es.length ? en : es}</p>
        </div>
      </div>
    </li>
  );
}

export default HoverFeatureItem;
