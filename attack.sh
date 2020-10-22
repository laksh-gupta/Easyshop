#!/bin/sh

for i in {1..105};
do
  echo $i `curl localhost:5000/test`;
done