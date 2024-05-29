const z = require('zod');


const registerSchema = z.object({
    username: z.string({
        required_error: 'Username is required',
    }),
    email: z.string({
        required_error: 'Email is required',
    }).email({
        message: 'Invalid email',
    }),
    password: z.string({
        required_error: 'Password is required',
    })
    .min(4, {
        message: "Password must be at least 4 characters",
    }),
});



const loginSchema = z.object({
    username: z.string({
        required_error: 'Username is required',
    }),
    password: z.string({
        required_error: 'Password is required',
    })
    .min(4, {
        message: "Password must be at least 4 characters",
    }),
})

module.exports = {
    registerSchema,
    loginSchema
  };
  