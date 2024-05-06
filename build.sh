export PATH="$PATH:/home/github-runner/.nvm/versions/node/v20.6.1/bin/"

npm install
npm run build

# Determine current Git branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Set the image tag based on the branch
if [ "$BRANCH" = "develop" ]; then
  TAG="studio-dev"
else
  TAG="studio"
fi

echo Building and deploying $TAG

# Build and push Docker image
docker build -f Dockerfile . -t docker-registry.apibrew.io/$TAG:latest --platform linux/amd64 || exit 1
docker push docker-registry.apibrew.io/$TAG:latest

# Restart deployment
kubectl rollout restart deployment $TAG
