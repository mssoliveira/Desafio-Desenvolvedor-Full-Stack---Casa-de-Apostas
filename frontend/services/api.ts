import { fetchFactory } from '@/lib/fetch';

const api = fetchFactory(`${process.env.NEXT_PUBLIC_API}`);

export default api;
