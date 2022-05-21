// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import 'dotenv/config';
import type { NextApiRequest, NextApiResponse } from "next";

export async function getIPAddress(): Promise<string> {
  const response = await axios.get("https://api.ipgeolocation.io/getip");
  // const body = await response.data.ip
  const ip = await response.data.ip;
  return ip;
}

export async function getTimeZone(): Promise<string> {
  const response = await axios.get(
    `https://api.ipgeolocation.io/timezone?apiKey=${process.env.ipgeolocationAPIKey}`
  );
  const timezone = await response.data.timezone;
  return timezone;
}

export async function getTimeZoneOffset(): Promise<number> {
  const response = await axios.get(
    `https://api.ipgeolocation.io/timezone?apiKey=${process.env.ipgeolocationAPIKey}`
  );
  const offset = await response.data.timezone_offset;
  return offset;
}
