# TypeScript のプロジェクトで OpenAPI を利用するための手法の整理

| Registry | Status                                                                                                                                                     |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm      | [![npm version](https://badge.fury.io/js/%40himenon%2Fopenapi-typescript-practice.svg)](https://badge.fury.io/js/%40himenon%2Fopenapi-typescript-practice) |

## Development

### package.json scripts

```json
{
  "build": "build code and generate docs",
  "cherry-pick": "Create Proxy Directories",
  "clean": "clean up",
  "copy:lib": "copy files to release directory",
  "mock:server": "yarn run mock:server endpoints/Article/index.yml",
  "tsc:build:cjs": "Generate Commonjs",
  "tsc:build:esm": "Generate ES module",
  "tsc:build:types": "Generate Type definition only",
  "release:github:registry": "publish github for registry",
  "release:npm:registry": "publish for npm registry"
}
```

### Release

release version

```bash
yarn run lerna version --yes
```

## Tools

### Preview

#### Realtime

- https://marketplace.visualstudio.com/items?itemName=philosowaffle.openapi-designer

#### Docker

```bash
yarn run swagger:server
```

- https://hub.docker.com/r/swaggerapi/swagger-ui/

### API Mock Server (PORT 4000)

```bash
yarn run prism:server
```

- https://www.npmjs.com/package/@stoplight/prism-cli
- https://github.com/stoplightio/prism

### Static Document Generator

- https://github.com/Redocly/redoc
- https://www.npmjs.com/package/redoc-cli

### Linter

- https://marketplace.visualstudio.com/items?itemName=mermade.openapi-lint

### Formatter

- [prettier](https://www.npmjs.com/package/prettier)

## Development Flow

- `src/`の yml を編集時、OpenApi Preview で確認
- API MockServer を起動して、API の疎通確認

## Build Flow

- `openapi-generator-cli`を利用して、`dist/`以下にコードを自動生成

## Trouble Shooting

### openapi-generator

#### `Cannot find name 'GlobalFetch'.`

```bash
--additional-properties=typescriptThreePlus=true
```

- https://github.com/OpenAPITools/openapi-generator/issues/3869#issuecomment-584152932

## Reference

- [VSCode でリファクタリング・保守する OpenAPI - Qiita](https://qiita.com/tMinami/items/5b1a921e82b4c7979cd1)
- [俺的【OAS】との向き合い方 (爆速で OpenAPI と友達になろう)](https://tech-blog.optim.co.jp/entry/2020/04/13/100000)

#### `WARN i.s.v.p.p.ExternalRefProcessor - A model for class Schema`

- ディレクトリ名に予約語を利用している場合に発生する
  - created
  - updated
  - deleted
  - entity
  - model

#### `[main] WARN o.o.c.ignore.CodegenIgnoreProcessor - Output directory does not exist, or is inaccessible. No file (.openapi-generator-ignore) will be evaluated.`

対応中

## LICENSE

MIT
