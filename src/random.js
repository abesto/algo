export const intBetween = (lowInclusive, highExclusive) => Math.floor(
  Math.random() * (highExclusive - lowInclusive + 1) + lowInclusive
)
