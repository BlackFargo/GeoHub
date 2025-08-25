"use client";
import Checkbox from "@mui/material/Checkbox";

import { ISelectedRegion } from "./Container";
const regions = [
  { id: "region-1", name: "Europe" },
  { id: "region-2", name: "Asia" },
  { id: "region-3", name: "Africa" },
  { id: "region-4", name: "Americas" },
  { id: "region-5", name: "Antarctic" },
  { id: "region-6", name: "Oceania" },
];

export function RegionFilter({
  selectedRegion,
  handleChange,
}: {
  selectedRegion: ISelectedRegion[];
  handleChange: (region: ISelectedRegion) => void;
}) {
  return (
    <div>
      {regions.map((region) => (
        <label htmlFor={region.id} key={region.id}>
          <Checkbox
            id={region.id}
            checked={selectedRegion.some((item) => item.name === region.name)}
            onChange={() => handleChange(region)}
          />
          {region.name}
        </label>
      ))}
    </div>
  );
}
