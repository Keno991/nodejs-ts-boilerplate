This is a Node.js app with Typescript, containing basic functionalities.

## Installing dependencies

```bash
yarn install
```

## Starting app

- local

```bash
yarn dev:start
```

- docker

```bash
docker build Dockerfile.development -f Dockerfile.development -t <name>
docker run -dp 5000:5000 getting-started
```
