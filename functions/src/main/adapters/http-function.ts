import { HttpsFunction, https } from "firebase-functions";
import { Controller } from "@/application/controllers/controller";

type Adatper = (controller: Controller) => HttpsFunction;

export const addHttpFunction: Adatper = (controller) => https.onRequest(async (req, res) => {
    const { statusCode, data } = await controller.handle(req.body);
    const json = statusCode < 300 ? data : { error: data.message };
    res.status(statusCode).json(json);
});
