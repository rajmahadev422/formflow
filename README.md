# FormFlow (JavaScript)

A full-stack form builder — Next.js, MongoDB, Tailwind CSS v4, Zustand. Pure JavaScript, no TypeScript.

## Setup

```bash
npm install
```

> Create `.env` file and add your MongoDB URI: `NEXT_MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.y8dzde5.mongodb.net/form-flow
`

## Run Project

```bash
npm run dev
# → http://localhost:3000
```

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/forms/create` | Form builder |
| `/forms` | All your forms |
| `/view/[id]` | Fill a form |
| `/forms/data/[id]` | View responses + PDF export |

## Stack

- **Next.js 16** · **MongoDB + Mongoose 9** · **Zustand 5** · **Tailwind CSS v4**
