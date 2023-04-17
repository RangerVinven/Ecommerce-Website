// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../utility/PrismaClient"

type Data = {
	Success: boolean
	Reviews?: Object[]
	Error?: Object
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return new Promise<void>(async (resolve, reject) => {
		
		if(!req.body.ProductName) {
			res.status(400).json({ Success: false, Error: "Missing parameters" });
			reject();
		}

		try {
			const reviews = await prisma.reviews.findMany({
				where: {
					ProductName: req.body.ProductName
				},
				select: {
					ID: true,
					Review: true,
					NumberOfStars: true,
					CustomerID: true,
					DateOfReview: true
				}
			});

			res.status(200).json({ Success: true, Reviews: reviews });
			resolve();
		} catch (error: any) {
			res.status(500).json({ Success: false, Error: error });
			reject();
		}
    })
}
