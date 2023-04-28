const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");

const service = require("../services/roles.service");
const requestResponsehelper = require("@baapcompany/core-api/helpers/requestResponse.helper");
const ValidationHelper = require("@baapcompany/core-api/helpers/validation.helper");

router.post(
    "/",
    checkSchema(require("../dto/roles/role.dto")),
    async (req, res) => {
        if (ValidationHelper.requestValidationErrors(req, res)) {
            return;
        }

        const serviceResponse = await service.save(req.body);

        requestResponsehelper.sendResponse(res, serviceResponse);
    }
);

router.put(
    "/:id",
    checkSchema(require("../dto/roles/role.dto")),
    async (req, res) => {
        if (ValidationHelper.requestValidationErrors(req, res)) {
            return;
        }

        const serviceResponse = await service.update(req.params.id, req.body);

        requestResponsehelper.sendResponse(res, serviceResponse);
    }
);

router.get("/:id", async (req, res) => {
    if (ValidationHelper.requestValidationErrors(req, res)) {
        return;
    }

    const serviceResponse = await service.getById(req.params.id);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/", async (req, res) => {
    if (ValidationHelper.requestValidationErrors(req, res)) {
        return;
    }

    const serviceResponse = await service.getAllRoles();

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/by-app", async (req, res) => {
    if (ValidationHelper.requestValidationErrors(req, res)) {
        return;
    }

    const serviceResponse = await service.getAllRoles();

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/all/roles", async (req, res) => {
    if (ValidationHelper.requestValidationErrors(req, res)) {
        return;
    }

    const serviceResponse = await service.getAllByCriteria({});

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.post("/add-permission", async (req, res) => {
    if (ValidationHelper.requestValidationErrors(req, res)) {
        return;
    }

    const serviceResponse = await service.addPermision(
        req.body.permissionId,
        req.body.roleId
    );

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.delete("/cleanup/roles-data", async (req, res) => {
    if (
        req.headers &&
        req.headers["baap-secret"] &&
        req.headers["baap-secret"] === "baap282812"
    ) {
        if (ValidationHelper.requestValidationErrors(req, res)) {
            return;
        }

        const serviceResponse = await service.cleanupRolesData(
            req.body.permissionId,
            req.body.roleId
        );

        requestResponsehelper.sendResponse(res, serviceResponse);
    } else {
        res.status(401).send({
            status: "Failed",
            message: "UnAuthorized - to perfrom this action",
        });
    }
});

router.get("/all/by-app-id/:appId", async (req, res) => {
    if (ValidationHelper.requestValidationErrors(req, res)) {
        return;
    }

    const serviceResponse = await service.getAllRolesByApp(
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
