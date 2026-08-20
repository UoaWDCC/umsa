# LOCAL PROTOTYPE — throwaway

This folder is a disconnected copy of UoaWDCC/umsa for a demo. There is **no git remote,
no `.git`, no CI and no husky hooks** — nothing here can be pushed anywhere.

**No database is needed.** `client/src/lib/api.ts` swaps axios' adapter for
`client/src/mocks/adapter.ts`, which answers every `/api/*` call from the fake data in
`client/src/mocks/data.ts`. The Express server and `ATLAS_URI` are not used at all.

Run it with the client alone:

```
pnpm --filter client dev      # http://localhost:5173
```

Fake data lives in one file — `client/src/mocks/data.ts` (members, events, homepage text).
Admin at `/admin` uses `umsa@projects.wdcc.co.nz` / `umsa`; edits persist until you reload.

Set `USE_MOCK_API = false` in `client/src/lib/api.ts` to go back to the real backend.

---

# selamat datang! :malaysia:

this is the repo for wdcc's project umsa 2026 !!

## a bit about the project

this is a full-stack react, node, express & mongodb, written in typescript with a vite front end & tailwindcss for ui styling :)

## getting started

### prerequisites

- install git [here](https://git-scm.com/downloads)
- install node [here](https://nodejs.org/en/download)

### running the project

- git clone
- cd umsa
- npm install -g pnpm
- pnpm install
- pnpm dev

### other scripts

to lint: pnpm lint
to build: pnpm build

## team members

| name                     | role            | fuel                                          | quote                                                                                          |
| ------------------------ | --------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------- | --- |
| hannah santiago          | project manager |                                               |                                                                                                |
| alanna santoso           | tech lead       | jasmine milk tea 70 sugar less ice            | _"hi!"_                                                                                        |
| koutaro yumimi           | tech overlord   | ethiopian natural                             | _"studying is doubting your own potential"_                                                    |
| matthew ren              | project manager |                                               |                                                                                                |     |
| nicholars garcia-scholtz | tech exec       |                                               |                                                                                                |     |
| amy yan                  | designer        |                                               | _"meow"_                                                                                       |
| andrew qiu               | designer        | charlies tea osmanthus oolong 30 sugar no ice | _"i am just a designer~"_                                                                      |
| terrence wu              | developer       | oolong milk tea 30 sugar little ice           | _"hardstuck bronze in league for 6 years (BUT IM GETTING OUT THIS YEAR IM BRONZE 3 44LP NOW)"_ |
| alex lee                 | developer       | pink monster                                  | "DAH" -pinkpanteress                                                                           |
| eric zheng               | developer       | dirty matcha latte                            | "disaster-"                                                                                    |
| jacky chen               | developer       | purple rice yoghurt                           | _"i make a lot of typos"_                                                                      |
| pruna lee                | developer       | coconut redbull                               | _"i love food"_                                                                                |
