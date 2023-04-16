import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import * as path from "path";
import { Topic } from "../../types/Topic";

const dataFilename = "data.json";
const dataPath = path.resolve(process.cwd(), "data", dataFilename);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Topic[]>
) {
  if (req.method === "GET") {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.status(200).json(JSON.parse(data));
    });
  }

  if (req.method === "PUT") {
    const author: string = req.body.author;
    const content: string = req.body.content;
    const id: string = req.body.id;

    if ([author, content, id].every((v) => v === undefined)) {
      console.error(new TypeError("Missing parameters"));
      res.status(200).json([]);
      return;
    }

    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(200).json([]);
        return;
      }
      const topics: Topic[] = JSON.parse(data);

      topics
        .find(({ id: _id }) => _id === id)
        ?.replys.push({ author, content });

      fs.writeFile(dataPath, JSON.stringify(topics), (err) => {
        if (err) {
          console.error(err);
          res.status(200).json([]);
          return;
        }
      });

      res.status(200).json([]);
    });
  }

  if (req.method === "POST") {
    const author: string = req.body.author;
    const title: string = req.body.title;
    const content: string = req.body.content;

    // 检查参数是否齐全
    if ([author, content].every((v) => v === undefined)) {
      console.error(new TypeError("Missing parameters"));
      res.status(200).json([]);
      return;
    }

    //  阅读数据文件
    fs.readFile(dataPath, "utf8", (err, data) => {
      // 文件有问题的时候
      if (err) {
        console.error(err);
        res.status(200).json([]);
        return;
      }

      // 导入数据
      const topics: Topic[] = JSON.parse(data);

      // 添加新的主题
      topics.push({
        id: String(topics.length),
        author,
        title,
        replys: [
          {
            author,
            content,
          },
        ],
      });

      // 写入数据文件
      fs.writeFile(dataPath, JSON.stringify(topics), (err) => {
        if (err) {
          console.error(err);
          res.status(200).json([]);
          return;
        }
      });

      res.status(200).json([]);
    });
  }
}
