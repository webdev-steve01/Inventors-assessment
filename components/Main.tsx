"use client";
import React, { useEffect, useState } from "react";
import type { Country } from "@/interfaces/CountriesInterface";
import RegionDropdown from "./RegionDropdown";
import Card from "./Card";

// const skeleton = 10;

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

  if (loading || countries.length === 0) {
    return (
      <div className="flex p-4 justify-center items-center h-screen">
        <div className="boxes">
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
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
        {filtered.length > 0 &&
          filtered
            .filter((country) =>
              country.name.common
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((country, i) => <Card key={i} country={country} />)}
      </section>
      <section
        onClick={() => setMore(more + 20)}
        className="flex justify-center mt-4 cursor-pointer text-black text-[1.2em] font-semibold"
      >
        {/* <p>Load More</p> */}
      </section>
    </div>
  );
}

export default Main;
