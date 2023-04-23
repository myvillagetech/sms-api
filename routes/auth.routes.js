const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const service = require("../services/auth.service");
const requestResponsehelper = require("@baapcompany/core-api/helpers/requestResponse.helper");
const ValidationHelper = require("@baapcompany/core-api/helpers/validation.helper");

const signInDto = require("../dto/auth/signin.dto");
const signupDto = require("../dto/auth/signup.dto");
const otpDto = require("../dto/auth/otp-validate");

router.post("/signin", checkSchema(signInDto), async (req, res, next) => {
    if (ValidationHelper.requestValidationErrors(req, res)) {
        return;
    }

    const response = await service.signIn(req.body);

    if (response.data) {
        res.cookie("baap-identity", response.data, {
            domain: ".baap.com",
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
        });
    }

    requestResponsehelper.sendResponse(res, response);
});

router.post("/validateOtp", checkSchema(otpDto), async (req, res, next) => {
    if (ValidationHelper.requestValidationErrors(req, res)) {
        return;
    }

    const response = await service.verifyOpt(req.body);

    if (response.data) {
        res.cookie("baap-identity", response.data, {
            domain: ".baap.com",
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
        });
    }

    requestResponsehelper.sendResponse(res, response);
});

router.post(
    "/sendOtp",
    checkSchema({
        phoneNumber: { notEmpty: true },
    }),
    async (req, res, next) => {
        if (ValidationHelper.requestValidationErrors(req, res)) {
            return;
        }

        const response = await service.sendOtp(req.body);

        requestResponsehelper.sendResponse(res, response);
    }
);

router.post("/signup", checkSchema(signupDto), async (req, res, next) => {
    if (ValidationHelper.requestValidationErrors(req, res)) {
        return;
    }

    const response = await service.signUp(req.body);

    requestResponsehelper.sendResponse(res, response);
});


router.post(
    "/signUpVerifyPhone",
    checkSchema({
        phoneNumber: { notEmpty: true },
    }),
    async (req, res, next) => {
        if (ValidationHelper.requestValidationErrors(req, res)) {
            return;
        }

        const response = await service.signUpVerifyPhone(req.body);

        requestResponsehelper.sendResponse(res, response);
    }
);

router.post(
    "/signUpValidateOtp",
    checkSchema({
        phoneNumber: { notEmpty: true },
    }),
    async (req, res, next) => {
        if (ValidationHelper.requestValidationErrors(req, res)) {
            return;
        }

        const response = await service.signUpValidateOtp(req.body);

        requestResponsehelper.sendResponse(res, response);
    }
);
module.exports = router;
