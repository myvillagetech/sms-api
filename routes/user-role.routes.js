const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const service = require("../services/userRoleMapping.service");
const requestResponsehelper = require("@baapcompany/core-api/helpers/requestResponse.helper");
const ValidationHelper = require("@baapcompany/core-api/helpers/validation.helper");

router.post(
    "/",
    checkSchema(require("../dto/userRoleMapping.dto")),
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

// router.get("/all/user-role-mapping", async (req, res) => {
//     const serviceResponse = await service.getAllByCriteria({});

//     requestResponsehelper.sendResponse(res, serviceResponse);
// });

router.post("/all/user-role-by-group", async (req, res) => {
    const serviceResponse = await service.getAllUserRolesByGroup(req.body);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

module.exports = router;
