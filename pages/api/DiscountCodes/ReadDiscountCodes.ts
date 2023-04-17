// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../utility/PrismaClient"

type Data = {
    Success: boolean
	Codes?: Object[]
	Error?: Object
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return new Promise<void>(async (resolve, reject) => {

		try {
			const codes = await prisma.discountCodes.findMany({
				select: {
					Code: true,
					DiscountPercentage: true,
					StartDate: true,
					ExpiryDate: true
				}
			});

			res.status(200).json({ Success: true, Codes: codes });
			resolve();
		} catch (error: any) {
			res.status(500).json({ Success: false, Error: error });
			reject();
		}
    })
}
