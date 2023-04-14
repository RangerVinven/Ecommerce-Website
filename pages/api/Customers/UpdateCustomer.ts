// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../utility/PrismaClient"

type Data = {
	Success: boolean
	Error?: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
	return new Promise<void>(async (resolve, reject) => {
	
		// Checks for missing parameters
		if(!req.body.ID || !req.body.FirstName || !req.body.LastName || !req.body.Email || !req.body.Password) {
			res.status(400).json({ Success: false, Error: "Missing parameters" });
			reject();
		}

		try {
			await prisma.customers.update({
				where: {
					ID: req.body.ID
				},
				data: {
					FirstName: req.body.FirstName,
					LastName: req.body.LastName,
					Email: req.body.Email,
					Password: req.body.Password
				}
			});

			res.status(200).json({ Success: true })
			resolve();

		} catch (error: any) {
			res.status(500).json({ Success: false, Error: error })
			reject();
		}
	})
}
