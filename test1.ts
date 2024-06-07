function reverseStringWithNumber(input: string): string {
  const letters =
    input
      .match(/[a-zA-Z]/g)
      ?.reverse()
      .join('') || '';
  const number = input.match(/\d+/)?.join('') || '';
  return letters + number;
}
console.log(reverseStringWithNumber('NEGIE1')); // Output: EIGEN1
