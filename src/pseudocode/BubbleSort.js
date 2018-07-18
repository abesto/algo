const BubbleSort = `
         init:BubbleSort({A}[0..{N}-1]) {
        while:    while (!{done}) {
   while-init:        {done} = true
          for:        for ({i} = 1; {i} < {N - 1}; {i}++) {
           if:            if ({A[i-1]} > {A[i]}) {
     not-done:                {done} = false
     not-done:                A[{i}], A[{i-1}] = {A[i-1]}, {A[i]}
           if:            }
          for:        }
        while:    }
         done:    // Done, list is sorted
         init:}
`

export default BubbleSort
