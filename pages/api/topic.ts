import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import * as path from "path";
import { Topic } from "../../types/Topic";

const dataFilename = "data.json";
const dataPath = path.resolve(process.cwd(), "data", dataFilename);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.status(200).json(JSON.parse(data));
    });
  }

  if (req.method === "POST") {
    const author = req.body.author;
    const content = req.body.content;
    const id = req.body.id;

    if (author === undefined || content === undefined || id === undefined) {
      res.status(200).json({
        error: "Missing parameters",
      });
      return;
    }

    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        res.status(200).json({
          error: String(err),
        });
        return;
      }
      const topics: Topic[] = JSON.parse(data);

      topics
        .find(({ id: _id }) => _id === id)
        ?.replys.push({ author, content });

      fs.writeFile(dataPath, JSON.stringify(topics), (err) => {
        if (err) {
          res.status(200).json({
            error: String(err),
          });
          return;
        }
      });

      res.status(200).json({});
    });
  }
}
