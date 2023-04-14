// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../utility/PrismaClient"

type Data = {
    Success?: boolean,
	Customer?: any
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
            // Makes sure the user can't access the customer's passwords
            let requestedDataWithoutPasswords = req.body.RequestedData;
            requestedDataWithoutPasswords["Password"] = false


			const customer = await prisma.customers.findUnique({
                where: {
                    ID: req.body.ID
                },
                select: requestedDataWithoutPasswords
            })

            if(customer === null) {
			    res.status(400).json({ Error: "Customer ID doesn't exist" });
                reject();

                return;
            }

			res.status(200).json({ Success: true, Customer: customer });
			resolve();
		} catch (error: any) {
			res.status(500).json({ Error: error });
			reject();
		}
    })
}
