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
		
        if(!req.body.ID) {
            res.status(400).json({ Success: false, Error: "Missing Parameters" });
            reject();
        }

		try {
			await prisma.productOptionChoices.delete({
                where: {
                    ID: req.body.ID
                }
			});

			res.status(200).json({ Success: true });
			resolve();
		} catch (error: any) {
			res.status(500).json({ Success: false, Error: error });
			reject();
		}
    })
}
