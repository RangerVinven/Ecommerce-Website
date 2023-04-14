// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../utility/PrismaClient"

type Data = {
	Categories?: Object[]
	Error?: Object
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return new Promise<void>(async (resolve, reject) => {
		
		try {
			const categories = await prisma.categories.findMany({
				select: {
					Category: true
				}
			});

			res.status(200).json({ Categories: categories });
			resolve();
		} catch (error: any) {
			res.status(500).json({ Error: error });
			reject();
		}
    })
}
