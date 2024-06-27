#!/bin/bash
cd `dirname $0`
export LANG="en_US.UTF-8"
export NLS_LANG=AMERICAN_CIS.UTF8
LANG="en_US.UTF-8"
NLS_LANG=AMERICAN_CIS.UTF8

#приймаємо логін та пароль
LOGIN=$1
PASS=$2

#перевірка наявності логіну в списку

if [[ "$LOGIN" = "danatskiy" ]]; then
        if [[ "$PASS" = "1234" ]]; then
                echo "login accepted"
        else
                echo "login is denied"
        fi
fi
if [[ "$LOGIN" = "ishkorup" ]]; then
        if [[ "$PASS" = "123456" ]]; then
                echo "login accepted"
        else
                echo "login is denied"
        fi
fi
if [[ "$LOGIN" = "ezozulya" ]]; then
        if [[ "$PASS" = "123456" ]]; then
                echo "login accepted"
        else
                echo "login is denied"
        fi
fi
if [[ "$LOGIN" = "dtrushina" ]]; then
        if [[ "$PASS" = "123456" ]]; then
                echo "login accepted"
        else
                echo "login is denied"
        fi
fi
if [[ "$LOGIN" = "advadtsatnaya" ]]; then
        if [[ "$PASS" = "123456" ]]; then
                echo "login accepted"
        else
                echo "login is denied"
        fi
fi
if [[ "$LOGIN" = "alesyuk" ]]; then
        if [[ "$PASS" = "123456" ]]; then
                echo "login accepted"
        else
                echo "login is denied"
        fi
fi
