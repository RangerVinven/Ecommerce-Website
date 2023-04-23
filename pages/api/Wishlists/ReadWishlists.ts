// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../utility/PrismaClient"

type Data = {
    Success?: boolean,
	Wishlists?: any
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

            return;
        }
		
		try {
			const wishlists = await prisma.wishlists.findMany({
                where: {
                    CustomerID: req.body.CustomerID
                },
                select: {
                    ID: true,
                    ProductName: true,
                }
            })

			res.status(200).json({ Success: true, Wishlists: wishlists });
			resolve();
		} catch (error: any) {

            if(error.code === "P2003") {
                res.status(500).json({ Error: "Customer ID doens't exist" });
			    reject();

                return;
            }

			res.status(500).json({ Error: error });
			reject();
		}
    })
}
