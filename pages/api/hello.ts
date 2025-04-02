import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch("https://m5scpyd7b2iadudwd7imuv3vwa0wazir.lambda-url.ap-southeast-1.on.aws/"); 
    const data = await response.json();

    res.status(200).json(data); 
  } catch (error) {
    console.error("Error fetching data from Lambda:", error);
    res.status(500).json({ error: "Failed to fetch data" }); 
  }
}
