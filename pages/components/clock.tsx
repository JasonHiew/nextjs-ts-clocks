import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { timezones } from "../lib/timezones";
import { addSeconds, compareAsc, format } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

interface Props {
  timezone: string;
  offset: number;
}

const Clock: NextPage<Props> = (props) => {
  const [date, setDate] = useState(new Date());
  const [timezone, setTimezone] = useState(props.timezone);
  const [IANATimezone, setIANATimezone] = useState(props.timezone);
  const [offset, setOffset] = useState(props.offset);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = e.target.selectedIndex;
    setTimezone(timezones[idx].value);
    setIANATimezone(timezones[idx].utc[0]);
    setOffset(timezones[idx].offset);
  };

  let utc = zonedTimeToUtc(new Date(), timezone);
  // let regionDate = utcToZonedTime(utc, IANATimezone);

  useEffect(() => {
    let regionDate = utcToZonedTime(new Date(), IANATimezone);
    // console.log(regionDate.getTimezoneOffset());
    const interval = setInterval(() => {
      setDate(utcToZonedTime(new Date(), IANATimezone));
      console.log("");
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [offset]);

  return (
    <div className="overflow-hidden">
      <div className="mb-5">
        <h3 className="text-xl">Time Zone: </h3>
        <h3 className="text-xl text-ellipsis font-bold h-12">
          (UTC{offset > 0 ? ` +${offset}` : ` ${offset}`}) {timezone}
        </h3>
      </div>
      <div className="grid grid-cols-11 grid-rows-2 gap-1 items-center justify-center">
        <h1 className="col-span-11 py-5 h-15 bg-black text-white text-center text-4xl rounded-xl">
          {format(date, "eeeeeeee")}
        </h1>
        <h1 className="row-start-2 col-span-3 py-5 h-15 bg-black text-white text-center text-4xl rounded-xl">
          {format(date, "H")}
        </h1>
        <h1 className="row-start-2 col-span-1 py-5 h-15 text-black font-extrabold text-center text-4xl rounded-xl">
          :
        </h1>
        <h1 className=" row-start-2 col-span-3 py-5 h-15 bg-black text-white text-center text-4xl rounded-xl">
          {format(date, "mm")}
        </h1>
        <h1 className="row-start-2 col-span-1 py-5 h-15 text-black font-extrabold text-center text-4xl rounded-xl">
          :
        </h1>
        <h1 className="row-start-2 col-span-3 py-5 h-15 bg-black text-white text-center text-4xl rounded-xl">
          {format(date, "ss")}
        </h1>
      </div>
      <select
        className="mt-5 overflow-hidden truncate border-2 border-gray-800 w-full h-10 p-2 hover:shadow-lg"
        onChange={(e) => {
          handleSelectChange(e);
        }}
        value={timezone}
      >
        {timezones.map((data, idx) => (
          <option key={idx} value={data.value}>
            {data.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Clock;
