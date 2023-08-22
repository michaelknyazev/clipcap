FROM alpine:latest as alpine

RUN apk add -U --no-cache ca-certificates

FROM scratch
ENTRYPOINT []
WORKDIR /
COPY --from=alpine /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

COPY ./clipcap-extension /go/bin/clipcap-extension
EXPOSE 8080

CMD ["/go/bin/clipcap-extension", "serve", "-c", "/opt/clipcap/config.yaml"]

