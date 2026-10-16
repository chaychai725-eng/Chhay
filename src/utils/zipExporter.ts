import JSZip from 'jszip';
import { Project } from '../types';

export async function exportProjectToZip(project: Project): Promise<void> {
  const zip = new JSZip();

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project.title || 'QuantYield Generated Website'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Kantumruy+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  ${project.html}
  <script src="script.js"></script>
</body>
</html>`;

  const packageJson = JSON.stringify({
    name: (project.title || 'quantyield-site').toLowerCase().replace(/[^a-z0-9]/g, '-'),
    version: '1.0.0',
    description: project.description || 'Generated with QuantYield AI Builder',
    scripts: {
      "start": "npx serve ."
    }
  }, null, 2);

  const readmeMd = `# ${project.title}
${project.tagline ? `> ${project.tagline}\n` : ''}

Generated with **QuantYield AI Builder**.

## Files
- \`index.html\`: Core semantic HTML structure with responsive Tailwind CSS classes.
- \`styles.css\`: Custom styling, animations, and typography enhancements.
- \`script.js\`: Interactive behaviors and client-side logic.
- \`package.json\`: Project manifest.

## Running Locally
You can double-click \`index.html\` in any web browser, or run:
\`\`\`bash
npx serve .
\`\`\`

## Deployment
This project is static and ready to deploy instantly to GitHub Pages, Cloud Run, Vercel, or Netlify.
`;

  // Add files to zip
  zip.file('index.html', fullHtml);
  zip.file('styles.css', project.css || '/* Custom CSS */');
  zip.file('script.js', project.js || '// Custom JS');
  zip.file('package.json', packageJson);
  zip.file('README.md', readmeMd);

  // Generate blob and trigger download
  const blob = await zip.generateAsync({ type: 'blob' });
  const filename = `${(project.title || 'website').toLowerCase().replace(/[^a-z0-9]/g, '-')}-quantyield.zip`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
