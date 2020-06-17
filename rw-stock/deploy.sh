#!/bin/bash

git subtree push --prefix rw-stock heroku master
heroku run python manage.py db upgrade --app rw-stock