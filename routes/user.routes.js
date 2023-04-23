const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const service = require("../services/user.service");
const requestResponsehelper = require("@baapcompany/core-api/helpers/requestResponse.helper");
const ValidationHelper = require("@baapcompany/core-api/helpers/validation.helper");
const jwt = require("jsonwebtoken");

router.delete("/:id", async (req, res) => {
    const serviceResponse = await service.deleteById(req.params.id);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.put("/:id", async (req, res) => {
    const serviceResponse = await service.updateById(req.params.id);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/:id", async (req, res) => {
    const serviceResponse = await service.getById(req.params.id);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/all/user", async (req, res) => {
    const serviceResponse = await service.getAllByCriteria({});

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/loggedin/userDeatils", async (req, res) => {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        try {
            const decodedUser = await jwt.verify(
                req.headers.authorization.split(" ")[1],
                process.env.API_SECRET
            );
            res.status(200).send({ data: decodedUser });
        } catch (error) {
            res.status(401).send({
                status: "Failed",
                message: "UnAuthorized - Invalid token",
            });
        }
    } else {
        res.status(401).send({
            status: "Failed",
            message: "UnAuthorized - Token Not found",
        });
    }
});

router.get("/checkPhoneNumberAvailability/:phoneNumber", async (req, res) => {
    const serviceResponse = await service.checkPhoneNumberAvailability(req.params.phoneNumber);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/checkEmailAvailability/:email", async (req, res) => {
    const serviceResponse = await service.checkEmailAvailability(req.params.email);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.post("/save/mpin", async (req, res) => {
    const serviceResponse = await service.saveMpin(req.body);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.post("/validate/mpin", async (req, res) => {
    const serviceResponse = await service.validateMpin(req.body);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

module.exports = router;
