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
		if(!req.body.Category) {
			res.status(400).json({ Success: false, Error: "Missing category" })
			reject();
		}

		try {
			await prisma.categories.delete({
				where: {
					Category: req.body.Category
				}
			})

			res.status(200).json({ Success: true })
			resolve();

		} catch (error: any) {

			// Checks if the category doesn't exist
			if(error.code === "P2025") {
				res.status(500).json({ Success: false, Error: "Category doesn't exist" })
				reject();
			}		

			res.status(500).json({ Success: false, Error: error })
			reject();
		}
    
	})
}
