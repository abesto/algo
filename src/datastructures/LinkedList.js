class Node {
  constructor (value, next = null) {
    this.value = value
    this.next = next
  }

  static fromArray (values) {
    const head = new Node(values[0])
    let node = head
    values.slice(1).forEach(value => {
      node.next = new Node(value)
      node = node.next
    })
    return head
  }

  * iterate () {
    let node = this
    while (node !== null) {
      yield node
      node = node.next
    }
  }
}

export default Node
