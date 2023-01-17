docker run \
    -e GOOGLE_APPLICATION_CREDENTIALS=/tmp/keys/telkomsel-retail-intelligence-sa.json \
    -v $GOOGLE_APPLICATION_CREDENTIALS:/tmp/keys/telkomsel-retail-intelligence-sa.json:ro \
    -p 8080:8080 \
hudabeybi/retina-api:latest