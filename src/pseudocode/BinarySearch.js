const BinarySearchCode = `
         :BinarySearch({A}[0..{N}-1], {value}) {
     init:    {low} = 0
     init:    {high} = {N} - 1
     loop:    while ({low} <= {high}) {
         :        // invariants: {value} > {A}[i] for all i < {low}
         :        //             {value} < {A}[i] for all i > {high}
      mid:        {mid} = ({low} + {high}) / 2
   branch:        if ({A}[{mid}] > {value})
 branch-0:            {high} = {mid} - 1
   branch:        else if ({A}[{mid}] < {value})
 branch-1:            {low} = {mid} + 1
   branch:        else
     done:            return {mid}
     loop:    }
not-found:    return not_found // {value} would be inserted at index "{low}"
        :}
`

export default BinarySearchCode
