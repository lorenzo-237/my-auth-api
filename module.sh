#!/bin/bash

name=$1

if [ -z "$name" ]; then
    echo "Aucun paramètre spécifié."
    exit 1
fi

echo "Let's go : $name"

nest g module $name
nest g service $name
nest g controller $name