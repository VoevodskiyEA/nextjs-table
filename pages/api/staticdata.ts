import type {NextApiRequest, NextApiResponse} from "next";
import {promises as fs} from 'fs';
type Data = {
  name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const fileContents = await fs.readFile('pages/api/users.json', 'utf8');
    res.status(200).json(JSON.parse(fileContents));
}
