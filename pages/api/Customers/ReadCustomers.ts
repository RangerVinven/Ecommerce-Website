// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../utility/PrismaClient"

type Data = {
    Success?: boolean,
	Customers?: Object[]
	Error?: Object
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return new Promise<void>(async (resolve, reject) => {

        if(!req.body.RequestedData) {
            res.status(400).json({ Success: false, Error: "Missing Parameters" });
            reject();
        }
		
		try {
            // Makes sure the user can't access customers' passwords
            let requestedDataWithoutPasswords = req.body.RequestedData;
            requestedDataWithoutPasswords["Password"] = false


			const customers = await prisma.customers.findMany({
				select: requestedDataWithoutPasswords
			});

			res.status(200).json({ Customers: customers });
			resolve();
		} catch (error: any) {
			res.status(500).json({ Error: error });
			reject();
		}
    })
}
