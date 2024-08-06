import { setCookie } from 'cookies-next';

export async function POST(request: Request) {
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return new Response('Invalid survey id', { status: 400 });
  }

  setCookie('key', 'value');

  return new Response('OK');
}
