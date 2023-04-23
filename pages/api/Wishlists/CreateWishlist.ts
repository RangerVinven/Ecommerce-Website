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
		if(!req.body.ProductName || !req.body.CustomerID) {
			res.status(400).json({ Success: false, Error: "Missing parameters" });
			reject();
		}

		try {
			await prisma.wishlists.create({
				data: {
					ProductName: req.body.ProductName,
                    CustomerID: req.body.CustomerID,
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
