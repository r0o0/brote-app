let uniqueId;

// prefix: used to generate unique id
// suffix: used for file types
export default uniqueId = function(prefix: string, suffix?: string) {
  const unique = Math.random().toString(26).substr(2, 16);
  return !suffix ? `${prefix}#${unique}` : `${prefix}#${unique}.${suffix}`;
};