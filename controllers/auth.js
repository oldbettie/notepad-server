const { verify } = require("jsonwebtoken");

module.exports = (req) => {
	const token = req.headers["x-access-token"];
	if (!token) {
		return {
			auth: false,
			message: "token doesnt exist please try logging in",
		};
	} else {
		return verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return {
					auth: false,
					message: "failed to authenticate please try logging in",
					error: err,
				};
			} else {
				req.userId = decoded.userId;
				return { auth: true, message: "authenticated" };
			}
		});
	}
};
