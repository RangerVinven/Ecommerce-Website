// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../utility/PrismaClient"

type Data = {
	Products?: Object[]
	Error?: Object
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return new Promise<void>(async (resolve, reject) => {
		
		try {
			const products = await prisma.products.findMany({
				select: {
					ProductName: true,
					Price: true,
					Description: true,
					Category: true,
					IsAvaliable: true,
					ThumbnailImage: true,
				}
			});

			res.status(200).json({ Products: products });
			resolve();
		} catch (error: any) {
			res.status(500).json({ Error: error });
			reject();
		}
    })
}
