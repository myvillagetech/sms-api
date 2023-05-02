const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const service = require("../services/complaint.service");
const requestResponsehelper = require("@baapcompany/core-api/helpers/requestResponse.helper");
const ValidationHelper = require("@baapcompany/core-api/helpers/validation.helper");

router.post(
    "/",
    checkSchema(require("../dto/complaint.dto")),
    async (req, res, next) => {
        if (ValidationHelper.requestValidationErrors(req, res)) {
            return;
        }
        const serviceResponse = await service.create(req.body);
        requestResponsehelper.sendResponse(res, serviceResponse);
    }
);

router.delete("/:id", async (req, res) => {
    const serviceResponse = await service.deleteById(req.params.id);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.put("/:id", async (req, res) => {
    const serviceResponse = await service.updateById(req.params.id, req.body);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/:id", async (req, res) => {
    const serviceResponse = await service.getById(req.params.id);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/user-raised-complaints/:userId", async (req, res) => {
    const serviceResponse = await service.getUserComplaints(req.params.userId);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.post("/get/statusCounts", async (req, res) => {
    const serviceResponse = await service.getStatusCounts(req.body);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/all/complaint", async (req, res) => {
    const serviceResponse = await service.getAllByCriteria({});

    requestResponsehelper.sendResponse(res, serviceResponse);
});

module.exports = router;
