import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../models/Users.mjs";
import dotenv from "dotenv";
import Problem from "../models/Problem.mjs";
import { Students } from "../models/Students.mjs";
import { EmployerModel } from "../models/Employers.mjs";
import { Request, Response } from "express";
import { Error } from "mongoose";

dotenv.config();

const secret: any = process.env.SECRET_KEY;

const generateToken = (name: String, email: String) => {
  const payload = {
    name,
    email,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class FuncController {
  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Авторизация пользователя
   *     tags: [Game]
   *     requestBody:
   *       description: Данные для входа
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Успешная авторизация
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken(user.name, user.email);
        return res.status(200).json({ token: token });
      } else {
        return res.status(403).json({ message: "Wrong password" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * @swagger
   * /getTask:
   *   get:
   *     summary: Получение задачи
   *     tags: [Game]
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         required: true
   *         schema:
   *           type: string
   *         description: Bearer token
   *     responses:
   *       200:
   *         description: Успешное получение задачи
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 db_name:
   *                   type: string
   *                 task:
   *                   type: string
   *                 properties:
   *                   type: array
   *                   items:
   *                     type: string
   *                 extraFields:
   *                   type: array
   *                   items:
   *                     type: string
   */
  async getTask(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Authorization token missing!" });
      }

      const decoded = jwt.verify(token, secret) as {
        email: string;
        name: string;
      };

      const level = await Users.findOne({ email: decoded.email }).select({
        level: 1,
        _id: 0,
      });
      if (level === null) {
        return res.status(401).json({ message: "User level not found" });
      }
      const problemName = await Problem.findOne({
        taskNumber: level.level,
      }).select({ db_name: 1, task: 1, properties: 1, extraFileds: 1, _id: 0 });
      return res.status(200).json(problemName);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * @swagger
   * /getUser:
   *   get:
   *     summary: Получение информации о пользователе
   *     tags: [Game]
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         required: true
   *         schema:
   *           type: string
   *         description: Bearer token
   *     responses:
   *       200:
   *         description: Успешное получение информации о пользователе
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 level:
   *                   type: number
   *                 name:
   *                   type: string
   */
  async getUserInfo(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Authorization token missing!" });
      }
      const decoded = jwt.verify(token, secret) as {
        email: string;
        name: string;
      };
      const info = await Users.findOne({ email: decoded.email }).select({
        level: 1,
        name: 1,
        _id: 0,
      });
      if (info === null) {
        return res.status(401).json({ message: "Token is invalid." });
      }
      return res.status(200).json(info);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * @swagger
   * /sendTask:
   *   post:
   *     summary: Отправка ответа на задачу
   *     tags: [Game]
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         required: true
   *         schema:
   *           type: string
   *         description: Bearer token
   *     requestBody:
   *       description: Ответ на задачу
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               answear:
   *                 type: string
   *     responses:
   *       200:
   *         description: Успешная отправка ответа
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 result:
   *                   type: string
   *       400:
   *         description: Ошибка в отправке ответа
   */
  async sendAnswear(req: Request, res: Response) {
    try {
      const { answear } = req.body;
      const database_name = answear.split(".")[0];
      if (database_name === "Students") {
        const response = await Function(
          database_name,
          `return ${answear}`
        )(Students);
        return res.status(200).json({ result: response });
      } else if (database_name === "Employers") {
        const response = await Function(
          database_name,
          `return ${answear}`
        )(EmployerModel);
        return res.status(200).json({ result: response });
      } else {
        console.log("DB Name was not found");
        return res.status(400).json({ result: "Wrong pipeline" });
      }
    } catch (err: any) {
      return res.status(400).json({ result: err.message });
    }
  }

  /**
   * @swagger
   * /checkTask:
   *   post:
   *     summary: Проверка ответа на задачу
   *     tags: [Game]
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         required: true
   *         schema:
   *           type: string
   *         description: Bearer token
   *     requestBody:
   *       description: Результат выполнения задачи
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               result:
   *                 type: string
   *     responses:
   *       200:
   *         description: Успешная проверка
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       400:
   *         description: Ошибка в проверке
   *       401:
   *         description: Ошибка авторизации
   */
  async checkAnswear(req: Request, res: Response) {
    try {
      const { result } = req.body;
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Authorization token error" });
      }

      const decoded = jwt.verify(token, secret) as {
        email: string;
        name: string;
      };
      const level = await Users.findOne({ email: decoded.email }).select({
        level: 1,
        _id: 0,
      });
      if (!level?.level) {
        return res.status(400).json({ message: "Retrieving error" });
      }
      const problem = await Problem.findOne({ taskNumber: level.level }).select(
        { expected: 1, _id: 0 }
      );
      if (!problem?.expected) {
        return res.status(400).json({ message: "Retrieving error" });
      }
      const db_name = problem.expected.split(".")[0];
      let response = [{}];
      if (db_name === "Students") {
        response = await Function(
          db_name,
          `return ${problem.expected}`
        )(Students);
      } else if (db_name === "Employers") {
        response = await Function(
          db_name,
          `return ${problem.expected}`
        )(EmployerModel);
      }
      if (JSON.stringify(response) === JSON.stringify(result)) {
        const changeUserLevel = await Users.findOne({ email: decoded.email });
        if (!changeUserLevel?.level) {
          return res.status(400).json({ message: "Retrieving error" });
        }
        changeUserLevel.level += 1;
        await changeUserLevel.save();
        return res.status(200).json({ message: "passed" });
      } else {
        return res.status(200).json({ message: "failed" });
      }
    } catch (err) {
      console.log(err + " Wrong query");
    }
  }
}

export default new FuncController();
