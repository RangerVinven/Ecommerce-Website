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
		if(!req.body.CustomerID) {
			res.status(400).json({ Success: false, Error: "Missing Customer ID" })
			reject();

			return;
		}

		try {
						
			const prismaResponse = await prisma.baskets.deleteMany({
				where: {
                    CustomerID: {
						equals: req.body.CustomerID
					}
                }
			})

			if(prismaResponse.count === 0) {
				res.status(400).json({ Success: false, Error: "Customer ID doesn't exist" })
				reject();

				return;
			}
			

			res.status(200).json({ Success: true })
			resolve();

		} catch (error: any) {
			res.status(500).json({ Success: false, Error: error })
			reject();
		}
    
	})
}
