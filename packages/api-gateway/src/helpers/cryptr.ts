import Encryptor from 'cryptr';

export const encryptor = new Encryptor(process.env.SESSION_INFO_SECRET!);
