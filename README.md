# mike.cousins.io

> Mike Cousins' home on the internet

<https://mike.cousins.io>

## Develop

```shell
# start the dev server
npm run dev

# format, lint, and typecheck
npm run format
npm run lint
npm run check

# build and serve production assets
npm run build
npm run preview
```

## Deploy

Cut a new version and push to GitHub to tell the CI server to build and deploy HTML and CSS to GitHub pages:

```shell
npm version ${level} -m 'chore(release): %s'
git push --follow-tags
```
