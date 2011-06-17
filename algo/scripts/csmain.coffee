define ['cs!loadcss', 'vendor/jquery', 'vendor/raphael', 'cs!widgets/LinkedList']
, (css, $, Raphael, L) ->
  css 'reset', 'main'
  $ ->
    $w = $(window)
    [h, w] = [$w.height(), $w.width()]
    $('#display').css
      width: w
      height: h

    paper = Raphael 'display'

    l = new L(paper, 100, 100)
    l.push 'One', 'aaaaaaaa'
    l.push 'Two', 'bbb'
    l.push 'Three', 'cccc'
    l.insertBefore 2, 'Two-and-a-half', 'ddddddddddd'
    l.insertAfter 0, 'One-and-a-half', 'eeee'
    l.unshift 'Zero', 'f'
    l.insertBefore 1, 'Half'

    l = new L(paper, 100, 200)
    l.push 'One', 'aaaaaaaa'
    l.push 'Two', 'bbb'
    l.push 'Three', 'cccc'
    l.insertBefore 2, 'Two-and-a-half', 'ddddddddddd'
    l.insertAfter 0, 'One-and-a-half', 'eeee'
    l.unshift 'Zero', 'f'
    l.insertBefore 1, 'Half'

    l.shift() # Zero
    l.pop() # Three
    l.removeAt 2 # One-and-a-half

