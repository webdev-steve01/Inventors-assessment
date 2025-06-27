"use client";
import React, { useEffect, useState } from "react";
import type { Country } from "@/interfaces/CountriesInterface";
import RegionDropdown from "./RegionDropdown";
import Card from "./Card";

const skeleton = 10;

const fetchCountries = async () => {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }
  return res.json();
};

function Main() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [sliced, setSliced] = useState<Country[]>([]);
  const [filtered, setFiltered] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [more, setMore] = useState<number>(10);

  useEffect(() => {
    if (region === "All") {
      setFiltered(countries);
    } else {
      setFiltered(countries.filter((c) => c.region === region));
    }
  }, [region, countries]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCountries();
        setCountries(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (filtered.length > 0) {
      setSliced(filtered.slice(0, more));
    }
  }, [filtered, more]);

  if (loading) {
    return (
      <div className="flex p-4 justify-center items-center h-screen">
        <div className="flex flex-col gap-4">
          {Array.from({ length: skeleton }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 h-16 w-full max-w-md rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded bg-[#FCAA67] border-none focus:outline-none w-full max-w-md"
          name=""
          id=""
        />
        <div>
          <RegionDropdown selectedRegion={region} onChange={setRegion} />
        </div>
      </div>
      <section className="flex flex-wrap gap-4 container mx-auto ">
        {sliced
          .filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((country, i) => (
            <Card key={i} country={country} />
          ))}
      </section>
      <section
        onClick={() => setMore(more + 20)}
        className="flex justify-center mt-4 cursor-pointer text-black text-[1.2em] font-semibold"
      >
        <p>Load More</p>
      </section>
    </div>
  );
}

export default Main;
