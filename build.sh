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

# Build and push Docker image
docker build -f Dockerfile . -t docker-registry.apibrew.io/$TAG:latest --platform linux/amd64 || exit 1
docker push docker-registry.apibrew.io/$TAG:latest

# Restart deployment
k0s kubectl rollout restart deployment $TAG
