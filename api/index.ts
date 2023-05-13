import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./user/user.router";
import { appointmentRouter } from "./apointments/appointment.router";
import { formRouter } from "./form/form.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();


app.use(cors())
app.use(express.urlencoded())
app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel')
})
app.use("/api/users", userRouter)
app.use("/api/appointments", appointmentRouter)
app.use("/api/forms", formRouter)


app.listen(PORT, () => {
  console.log(
    `App listening on http://localhost:${PORT}`
  )
})

module.exports = app;