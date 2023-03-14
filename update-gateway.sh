gcloud api-gateway api-configs create retina-api-dev-config --api=retina-api-dev --openapi-spec=openapi2-run.yaml
gcloud api-gateway gateways update retina-api-dev-gateway --api=retina-api-dev --api-config=retina-api-dev-config --location=us-west2
gcloud api-gateway api-configs delete retina-api-dev-config2 --api=retina-api-dev