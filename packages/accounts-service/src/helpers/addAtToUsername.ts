export default function addAtToUsername(username: string): string {
  const startsWithAt = username.startsWith('@');
  if (startsWithAt) {
    return username;
  }

  return `@${username}`;
}
