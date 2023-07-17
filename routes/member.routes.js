const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const service = require("../services/member.service");
const propertiesService = require("../services/property.service");
const requestResponsehelper = require("@baapcompany/core-api/helpers/requestResponse.helper");
const ValidationHelper = require("@baapcompany/core-api/helpers/validation.helper");

router.post(
    "/",
    checkSchema(require("../dto/member.dto")),
    async (req, res, next) => {
        if (ValidationHelper.requestValidationErrors(req, res)) {
            return;
        }
        if(req?.body?.properties){
            req.body.properties = await propertiesService.bulkAdd(req?.body?.properties);
        }else{
            res.status(400).send(
                sanitizeResponseObject({
                    status: "Failed",
                    message: 'Properties are empty',
                })
            );
        }
        const serviceResponse = await service.registerMember(req.body);
        requestResponsehelper.sendResponse(res, serviceResponse);
    }
);

router.post(
    "/admin/add-member",
    checkSchema(require("../dto/member.dto")),
    async (req, res, next) => {
        if (ValidationHelper.requestValidationErrors(req, res)) {
            return;
        }
        const serviceResponse = await service.adminRegisterMember(req.body);
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

router.get("/search/all/", async (req, res) => {
    const serviceResponse = await service.searchByCriteria(req.query);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/all/member/pending-approval", async (req, res) => {
    const serviceResponse = await service.getAllByCriteria({
        status: "PendingApproval"
    });

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/all/member/rejected", async (req, res) => {
    const serviceResponse = await service.getAllByCriteria({
        status: "Rejected"
    });

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.put("/admin/approve-member/:memberId", async (req, res) => {
    const serviceResponse = await service.updateMemberStatus(req.params.memberId, "Approved");

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.put("/admin/reject-member/:memberId", async (req, res) => {
    const serviceResponse = await service.updateMemberStatus(req.params.memberId, "Rejected");

    requestResponsehelper.sendResponse(res, serviceResponse);
});

module.exports = router;
