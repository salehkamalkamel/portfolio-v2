export function slugAndIDsplit(slugAndId: string) {
  const lastHyphenIndex = slugAndId.lastIndexOf("-");
  if (lastHyphenIndex === -1) {
    throw new Error("Invalid format: No hyphen found in the string.");
  }
  const slug = slugAndId.substring(0, lastHyphenIndex);
  const id = slugAndId.substring(lastHyphenIndex + 1);
  return { slug, id };
}
