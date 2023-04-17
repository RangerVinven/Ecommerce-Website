// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../utility/PrismaClient"

type Data = {
    Success: boolean
	ProductOptionChocies?: Object[]
	Error?: Object
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return new Promise<void>(async (resolve, reject) => {
		
        if(!req.body.ProductOption) {
            res.status(400).json({ Success: false, Error: "Missing Parameters" });
            reject();

			return;
        }

		try {
			const productOptionChoices = await prisma.productOptionChoices.findMany({
				where: {
					ProductOption: req.body.ProductOption
				},
				select: {
					ID: true,
					Choice: true,
					IsAvaliable: true
				}
			})

			res.status(200).json({ Success: true, ProductOptionChocies: productOptionChoices });
			resolve();
		} catch (error: any) {
			res.status(500).json({ Success: false, Error: error });
			reject();
		}
    })
}
