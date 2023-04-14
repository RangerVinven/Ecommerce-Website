// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../utility/PrismaClient"

type Data = {
    Success?: boolean,
	Baskets?: any
	Error?: Object
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return new Promise<void>(async (resolve, reject) => {

        if(!req.body.CustomerID) {
            res.status(400).json({ Success: false, Error: "Missing Parameters" });
            reject();
        }
		
		try {
			const baskets = await prisma.baskets.findMany({
                where: {
                    CustomerID: req.body.CustomerID
                },
                select: {
                    ProductName: true,
                    Quantity: true
                }
            })

			res.status(200).json({ Success: true, Baskets: baskets });
			resolve();
		} catch (error: any) {
			res.status(500).json({ Error: error });
			reject();
		}
    })
}
