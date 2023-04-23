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
		if(!req.body.ProductName || !req.body.Picture || !req.body.OrderInDisplay) {
			res.status(400).json({ Success: false, Error: "Missing parameters" });
			reject();
		}        

		try {
			await prisma.productPictures.create({
				data: {
					ProductName: req.body.ProductName,
					Picture: req.body.Picture,
					OrderInDisplay: req.body.OrderInDisplay
				}
			})
			res.status(200).json({ Success: true })
			resolve();

		} catch (error: any) {
			// Checks if the product's category exists
			if(error.code === "P2003") {
				res.status(500).json({ Success: false, Error: "ProductName doesn't exist" })
				reject();
			}
			res.status(500).json({ Success: false, Error: error })
			reject();
		}
	})
}
