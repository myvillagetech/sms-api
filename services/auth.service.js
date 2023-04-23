const userSignUpOtpModel = require("../schema/userSignUpOtp");
const AuthModel = require("../schema/auth.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");
const userService = require("./user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ServiceResponse = require("@baapcompany/core-api/services/serviceResponse");

class AuthService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    async signIn(userDto) {
        try {
            const serviceResponse = await userService.getUserByUserName(
                userDto.userName
            );
            const user = serviceResponse.data && serviceResponse.data._doc;

            if (!user) {
                throw new Error("user does not exist");
            }

            const passwordIsValid = bcrypt.compareSync(
                userDto.password,
                user.password
            );

            if (!passwordIsValid) {
                throw new Error("Invalid password");
            }

            var token = jwt.sign(
                {
                    ...user,
                    password: null,
                },
                process.env.API_SECRET,
                {
                    expiresIn: 86400,
                }
            );

            return new ServiceResponse({
                data: token,
            });
        } catch (error) {
            return new ServiceResponse({
                isError: true,
                message: error.message,
            });
        }
    }

    async sendOtp({ phoneNumber }) {
        try {
            const serviceResponse = await userService.getUserByUserName(
                phoneNumber
            );
            const user = serviceResponse.data && serviceResponse.data._doc;

            if (!user) {
                throw new Error("user with this phone Number does not exist");
            }

            // need to integrate sms service here

            return new ServiceResponse({
                message: "OTP Sent Successfully",
            });
        } catch (error) {
            return new ServiceResponse({
                isError: true,
                message: error.message,
            });
        }
    }

    async signUpVerifyPhone({ phoneNumber }) {
        try {
            const serviceResponse = await userService.getUserByUserName(
                phoneNumber
            );
            const user = serviceResponse.data && serviceResponse.data._doc;

            if (user) {
                throw new Error("user with this phone Number already exists. go to login page and sign in");
            }

            // need to integrate sms service here
            const verifyOTP = await userSignUpOtpModel.findOneAndUpdate({
                phoneNumber: phoneNumber,
            }, {
                phoneNumber: phoneNumber,
                otp: 123456
            }, {
                upsert: true
            })
            return new ServiceResponse({
                message: "OTP Sent Successfully",
            });
        } catch (error) {
            return new ServiceResponse({
                isError: true,
                message: error.message,
            });
        }
    }

    async signUpValidateOtp({ phoneNumber, otp }) {
        try {
            const serviceResponse = await userService.getUserByUserName(
                phoneNumber
            );
            const user = serviceResponse.data && serviceResponse.data._doc;

            if (user) {
                throw new Error("user with this phone Number already exists. go to login page and sign in");
            }

            // need to integrate sms service here
            const singupOtp = await  userSignUpOtpModel.findOne({
                phoneNumber: phoneNumber,
                otp: otp
            });

            if(!singupOtp) {
                return new ServiceResponse({
                    isError: true,
                    message: "Invalid Otp",
                });
            }
            return new ServiceResponse({
                message: "OTP is Valid",
            });
        } catch (error) {
            return new ServiceResponse({
                isError: true,
                message: error.message,
            });
        }
    }

    async verifyOpt(otpDto) {
        try {
            const serviceResponse = await userService.getUserByUserName(
                otpDto.phoneNumber
            );
            const user = serviceResponse.data && serviceResponse.data._doc;

            if (!user) {
                throw new Error("user does not exist");
            }

            const isOtpValid = otpDto.otp === 282812;

            if (!isOtpValid) {
                throw new Error("Invalid OTP");
            }

            var token = jwt.sign(
                {
                    ...user,
                    password: null,
                },
                process.env.API_SECRET,
                {
                    expiresIn: 86400,
                }
            );

            return new ServiceResponse({
                token: token,
                message: "Verfied Successfully",
            });
        } catch (error) {
            return new ServiceResponse({
                isError: true,
                message: error.message,
            });
        }
    }

    async signUp(signupDto) {
        const verfiedMobile = await userSignUpOtpModel.findOne({phoneNumber: signupDto.phoneNumber});

        if(!verfiedMobile) {
            return new ServiceResponse({
                isError: true,
                message: "user phoneNumber need to be verified before signup",
            });
        }
        return userService.save(signupDto);
    }
}

module.exports = new AuthService(AuthModel, "auth");
