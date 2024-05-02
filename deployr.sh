git add . -A
git commit -m '+fixes'
git push

# Determine current Git branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)


ssh root@tisserv.net "cd studio; git checkout $BRANCH; git pull; sh build.sh"
