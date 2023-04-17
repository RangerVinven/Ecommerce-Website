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
		if(!req.body.Code || !req.body.NewCode || !req.body.DiscountPercentage) {
			res.status(400).json({ Success: false, Error: "Missing parameters" });
			reject();

			return;
		}

		// Makes sure the DiscountPercentage is <= 100%
		if(req.body.DiscountPercentage > 100) {
			res.status(400).json({ Success: false, Error: "Discount Percentage is too large" })
			reject();

			return;
		}

		try {
			await prisma.discountCodes.update({
				where: {
					Code: req.body.Code
				},
				data: {
					Code: req.body.NewCode,
					DiscountPercentage: req.body.DiscountPercentage,
					StartDate: new Date("2023/04/17"),
					ExpiryDate: new Date("2023/12/31")
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
