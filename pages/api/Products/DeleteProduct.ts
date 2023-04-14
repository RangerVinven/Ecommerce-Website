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
		if(!req.body.ProductName) {
			res.status(400).json({ Success: false, Error: "Missing ProductName" })
			reject();
		}

		try {
			await prisma.products.delete({
				where: {
					ProductName: req.body.ProductName
				}
			})

			res.status(200).json({ Success: true })
			resolve();

		} catch (error: any) {

			// Checks if the product ID doesn't exist
			if(error.code === "P2025") {
				res.status(500).json({ Success: false, Error: "Product Name doesn't exist" })
				reject();
			}		

			res.status(500).json({ Success: false, Error: error })
			reject();
		}
    
	})
}
