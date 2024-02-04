git add . -A
git commit -m '+fixes'
git push
ssh root@tisserv.net "cd studio; git pull; sh build.sh"
