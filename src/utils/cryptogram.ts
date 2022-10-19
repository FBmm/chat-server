import * as crypto from 'crypto';

/**
 * Make salt
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码验证
 */
export function encryptPassword(password: string, salt: string) {
  if (!password || !salt) return '';
  const tempSalt = Buffer.from(salt, 'base64');
  return crypto
    .pbkdf2Sync(password, tempSalt, 100000, 16, 'sha1')
    .toString('base64');
}
