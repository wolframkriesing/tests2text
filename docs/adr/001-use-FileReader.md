# 1. Use HTML5 API FileReader

## Status

Accepted

## Context

I was looking for a read-file-from-anywhere library.
To be able to read files from local filesystem or over (any)
protocols like HTTP(S).

## Decision

FileReader API defines a standardized API to read file.
There is a nodejs implementation. 
Half the work to be cross-platform is done.

## Consequences

- (-) this library seems to be unmaintained for a long time (but seems to be loaded quite often, so I assume it does its job)
- (+) using this API makes it easy to use this project on the web