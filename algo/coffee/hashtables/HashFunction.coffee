define ->
    class HashFunction
        constructor: (opts) ->
            @hash ?= opts.hash
            @inDomain ?= opts.inDomain
            @inRange ?= opts.inRange