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
			await prisma.categories.create({
				data: {
					Category: req.body.Category
				}
			})

			res.status(200).json({ Success: true })
			resolve();

		} catch (error: any) {

			// Checks if the category collides with an existing one
			if(error.code === "P2002") {
				res.status(500).json({ Success: false, Error: "Category already exists" })
				reject();
			}

			res.status(500).json({ Success: false, Error: error })
			reject();
		}
	})
}
