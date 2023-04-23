module.exports = {
    name: {
        isLength: {
            options: { min: 3 },
        },
    },
    phoneNumber: {
        notEmpty: true,
    },
    email: {
        notEmpty: true,
    },
    password: {
        notEmpty: true,
    },
};
