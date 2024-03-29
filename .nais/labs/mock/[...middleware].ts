import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../src/utils/serverLogger';

const backendUrl = process.env.TILTAKSPENGER_VEDTAK_URL || '';

function getUrl(req: NextApiRequest): string {
    const path = req?.url?.replace('/api', '');
    return `${backendUrl}${path}`;
}

async function makeApiRequest(request: NextApiRequest, oboToken: string): Promise<Response> {
    const url = getUrl(request);
    logger.info(`Making request to ${url}`);
    return await fetch(url, {
        method: request.method,
        body: request.method === 'GET' ? undefined : request.body,
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${oboToken}`,
        },
    });
}

export async function middleware(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    try {
        const res = await makeApiRequest(request, 'token');
        if (res.ok) {
            const body = await res.json();
            response.status(res.status).json(body);
        } else {
            const error = await res.text();
            response.status(res.status).json({ error: !error ? res.statusText : error });
        }
    } catch (error) {
        logger.error('Fikk ikke kontakt med APIet, returnerer 502', error);
        response.status(502).json({ message: 'Bad Gateway' });
    }
}

export default middleware;
