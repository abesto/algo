const BogoSort = `
         init:BogoSort({A}[0..{N}-1]) {
         loop:    while (true) {
             :        // First check if the list is sorted
issorted-loop:        for ({i} = 0; {i} < {N - 1}; {i}++) {
  issorted-if:            if ({A[i]} > {A[i+1]}) {
    notsorted:                // Not sorted
    notsorted:                break
  issorted-if:            }
issorted-loop:        }
issorted-post:        if ({i} == {N} - 1) {
         done:            // Sorted
         done:            return
issorted-post:        }
             :        // The array is not sorted. Let's shuffle it using Knuth's shuffle algorithm! 
  shuffle-for:        for ({i} = 0; {i} < {N} - 1; {i}++) {
    shuffle-j:            {j} = randomIntegerBetween({i}, {N})   // including {i}, excluding {N}
 shuffle-swap:            {A[i]}, {A[j]} = {A[j]}, {A[i]}          // Swap {A[i]} and {A[j]}
  shuffle-for:        }
 shuffle-done:        // Shuffle is done, let's start over
         loop:    }
         init:}
`

export default BogoSort
