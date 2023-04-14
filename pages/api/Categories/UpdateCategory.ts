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
		if(!req.body.OldCategory) {
			res.status(400).json({ Success: false, Error: "Missing old category" })
			reject();
		} else if (!req.body.NewCategory) {
			res.status(400).json({ Success: false, Error: "Missing new category" })
			reject();
		}

		try {
			await prisma.categories.update({
				where: {
					Category: req.body.OldCategory
				},
				data: {
					Category: req.body.NewCategory
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
