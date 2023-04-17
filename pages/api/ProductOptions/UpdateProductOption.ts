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
		if(!req.body.ID || !req.body.OptionName) {
			res.status(400).json({ Success: false, Error: "Missing parameters" });
			reject();
		}

		try {
			await prisma.productOptions.update({
				where: {
					ID: req.body.ID
				},
				data: {
					OptionName: req.body.OptionName
				}
			});

			res.status(200).json({ Success: true })
			resolve();

		} catch (error: any) {

            if(error.code === "P2025") {
                res.status(500).json({ Success: false, Error: "ID Not Found" })
                reject();

                return;
            }

			res.status(500).json({ Success: false, Error: error })
			reject();
		}
	})
}
