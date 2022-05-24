const { verify } = require("jsonwebtoken");

module.exports = (req, res) => {
	const token = req.headers["x-access-token"];
	if (!token) {
		res.json({
			auth: false,
			message: "token doesnt exist please try logging in",
		});
		return false;
	} else {
		return verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				res.json({
					auth: false,
					message: "failed to authenticate please try logging in",
					error: err,
				});
				return false;
			} else {
				req.userId = decoded.userId;
				res.json({ auth: true, message: "authenticated" });
				return true;
			}
		});
	}
};
