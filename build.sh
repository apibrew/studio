# Determine current Git branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo Building and deploying $TAG

# Build and push Docker image
docker build -f Dockerfile . -t tislib/apibrew-studio:latest --platform linux/amd64 || exit 1
docker push tislib/apibrew-studio:latest  || exit 1

