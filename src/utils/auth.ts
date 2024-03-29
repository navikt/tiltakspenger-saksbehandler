import { NextApiRequest } from 'next';
import SimpleResponse from '../types/SimpleResponse';
import { validateAzureToken } from '@navikt/next-auth-wonderwall';

const clientId = process.env.AZURE_APP_CLIENT_ID || '';
const clientSecret = process.env.AZURE_APP_CLIENT_SECRET || '';

function getFieldsForOnBehalfOfGrant(token: string, scope: string) {
  return {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    client_id: clientId,
    client_secret: clientSecret,
    assertion: token,
    scope: scope,
    requested_token_use: 'on_behalf_of',
  };
}

function createOnBehalfOfGrantBody(token: string, scope: string) {
  const oboGrantFields = getFieldsForOnBehalfOfGrant(token, scope);
  const body = new URLSearchParams();
  Object.entries(oboGrantFields).map(([fieldName, fieldValue = '']) => {
    body.append(fieldName, fieldValue);
  });
  return body;
}

async function makeOnBehalfOfGrant(body: URLSearchParams) {
  const url = `${process.env.AUTH_PROVIDER_URL}`;
  return fetch(url, {
    method: 'POST',
    body,
    headers: {
      ['Content-Type']: 'application/x-www-form-urlencoded',
    },
  });
}

export async function getOnBehalfOfToken(
  token: string,
  scope: string
): Promise<SimpleResponse | string> {
  const grantBody = createOnBehalfOfGrantBody(token, scope);
  const response = await makeOnBehalfOfGrant(grantBody);
  if (!response.ok) {
    return Promise.reject({
      status: response.status,
      content: response.headers.get('content-type'),
      body: response.body,
    });
  }
  const jsonResponse = await response.json();
  return jsonResponse.access_token;
}

const tokenRegex = /^Bearer (?<token>(\.?([A-Za-z0-9-_]+)){3})$/m;

async function validateAuthorizationHeader(request: NextApiRequest) {
  const { authorization } = request.headers;
  if (!authorization) {
    throw new Error('Ingen tilgang');
  }
  const authToken = authorization.match(tokenRegex)?.groups?.token;
  if (!authToken) {
    throw new Error('Ingen tilgang');
  }
  const validationResult = await validateAzureToken(authorization);
  if (validationResult !== 'valid') {
    throw new Error('Ingen tilgang');
  }
  return authToken;
}

export async function getToken(
  request: NextApiRequest
): Promise<SimpleResponse | string> {
  const scope = `api://${process.env.SCOPE}/.default`;
  const authToken = await validateAuthorizationHeader(request);
  return await getOnBehalfOfToken(authToken, scope);
}
