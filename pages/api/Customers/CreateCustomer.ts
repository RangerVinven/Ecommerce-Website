// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../utility/PrismaClient"

import { generateHashedPassword } from '../../../utility/HashPassword';

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
		if(!req.body.FirstName || !req.body.LastName || !req.body.Email || !req.body.Password) {
			res.status(400).json({ Success: false, Error: "Missing parameters" });
			reject();

			return;
		}

		const hashedPassword = generateHashedPassword(req.body.Password);

		try {
			await prisma.customers.create({
				data: {
					FirstName: req.body.FirstName,
					LastName: req.body.LastName,
					Email: req.body.Email,
					Password: hashedPassword,
				}
			})
			res.status(200).json({ Success: true })
			resolve();

		} catch (error: any) {
			res.status(500).json({ Success: false, Error: error })
			reject();
		}
	})
}
