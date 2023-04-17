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
		if(!req.body.ID || !req.body.Review || !req.body.NumberOfStars || !req.body.CustomerID || !req.body.ProductName || !req.body.ProductName) {
			res.status(400).json({ Success: false, Error: "Missing parameters" });
			reject();
		}

		// Makes sure NumberOfStars is 1-5
		if(req.body.NumberOfStars < 1 || req.body.NumberOfStars > 5) {
			res.status(400).json({ Success: false, Error: "NumberOfStars must be between 1-5" });
			reject();

			return;
		}

		try {
			await prisma.reviews.update({
				where: {
					ID: req.body.ID
				},
				data: {
					Review: req.body.Review,
					NumberOfStars: req.body.NumberOfStars,
					CustomerID: req.body.CustomerID,
					ProductName: req.body.ProductName,
					DateOfReview: new Date("2023/04/17")
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
