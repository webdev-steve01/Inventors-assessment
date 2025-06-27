import React from "react";
import type { Country } from "@/interfaces/CountriesInterface";
import Image from "next/image";

function Card({ country }: { country: Country }) {
  return (
    <div className="card p-4 rounded shadow-md w-full bg-[#635D5C]">
      <h2 className="font-bold text-[1.2em]">Name: {country.name.common}</h2>
      <p>Capital: {country.capital.join(", ")}</p>
      <p>Region: {country.region}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <div>
        <img
          src={country.flags.png}
          alt={country.flags.alt ? country.flags.alt : "country flag"}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}

export default Card;
