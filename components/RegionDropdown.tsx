import React from "react";

interface RegionDropdownProps {
  selectedRegion: string;
  onChange: (region: string) => void;
}

const RegionDropdown: React.FC<RegionDropdownProps> = ({
  selectedRegion,
  onChange,
}) => {
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <div>
      <label htmlFor="region-select" className="text-black">
        Filter by region:{" "}
      </label>
      <select
        id="region-select"
        className="border p-1 rounded bg-[#FCAA67] border-none focus:outline-none text-black"
        value={selectedRegion}
        onChange={(e) => onChange(e.target.value)}
      >
        {regions.map((region) => (
          <option className="text-black" key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionDropdown;
