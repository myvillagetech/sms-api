const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");

const service = require("../services/permissions.service");
const requestResponsehelper = require("@baapcompany/core-api/helpers/requestResponse.helper");
const ValidationHelper = require("@baapcompany/core-api/helpers/validation.helper");

router.post(
    "/",
    checkSchema(require("../dto/permissions/permission.dto")),
    async (req, res) => {
        if (ValidationHelper.requestValidationErrors(req, res)) {
            return;
        }

        const serviceResponse = await service.create(req.body);

        requestResponsehelper.sendResponse(res, serviceResponse);
    }
);

router.post("/bulk", async (req, res) => {
    if (ValidationHelper.requestValidationErrors(req, res)) {
        return;
    }

    const serviceResponse = await service.bulkadd(req.body, req.query.appId);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.put(
    "/:id",
    checkSchema(require("../dto/permissions/permission.dto")),
    async (req, res) => {
        if (ValidationHelper.requestValidationErrors(req, res)) {
            return;
        }

        const serviceResponse = await service.update(req.params.id, req.body);

        requestResponsehelper.sendResponse(res, serviceResponse);
    }
);

router.get("/", async (req, res) => {
    if (ValidationHelper.requestValidationErrors(req, res)) {
        return;
    }

    const serviceResponse = await service.getAllByCriteria(
        {},
        {
            pageSize: req.query.pageSize,
            pageNumber: req.query.pageNumber,
        }
    );

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/all/by-app-id/:appId", async (req, res) => {
    if (ValidationHelper.requestValidationErrors(req, res)) {
        return;
    }

    const serviceResponse = await service.getAllPermissionsByApp(
        req.params.appId,
        req.query.searchTerm,
        {
            pageSize: req.query.pageSize,
            pageNumber: req.query.pageNumber,
        }
    );

    requestResponsehelper.sendResponse(res, serviceResponse);
});

module.exports = router;
