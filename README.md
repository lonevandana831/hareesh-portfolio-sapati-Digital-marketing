# Hareesh Sapati · Portfolio

Angular 20 single-page portfolio. No backend: all content is hardcoded.

## Run locally

```bash
npm install
npm start          # http://localhost:4200
```

## Edit content

Everything you see on the site (text, numbers, case studies, screenshots, skills, contact details) lives in one file:

**`src/app/data/portfolio.data.ts`**

- **LinkedIn**: set `profile.linkedin` to your profile URL.
- **Add a result screenshot**: drop the image in `public/images/proof/`, then add an entry to `proofs`.
- **Add a brand logo**: drop the image in `public/images/brands/`, then add it to `brands`.
- **Update the CV**: replace `public/files/Hareesh_Sapati_Resume.docx` (a PDF is better; update `profile.resume` if you rename it).

## Deploy (free)

```bash
npm run build      # output: dist/hareesh-portfolio/browser
```

Upload the `dist/hareesh-portfolio/browser` folder to **Netlify** (drag & drop at app.netlify.com/drop), **Vercel**, or **GitHub Pages**.
