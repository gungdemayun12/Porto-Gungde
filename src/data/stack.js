/**
 * Data tech stack — teknologi yang digunakan
 * Dikelompokkan berdasarkan kategori.
 */

export const stackData = {
  frontend: [
    { name: 'React', icon: 'SiReact', color: '#61DAFB' },
    { name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E' },
    { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: '#06B6D4' },
    { name: 'HTML5', icon: 'SiHtml5', color: '#E34F26' },
    { name: 'CSS3', icon: 'SiCss3', color: '#1572B6' },
  ],
  backend: [
    { name: 'Laravel', icon: 'SiLaravel', color: '#FF2D20' },
    { name: 'PHP', icon: 'SiPhp', color: '#777BB4' },
    { name: 'MySQL', icon: 'SiMysql', color: '#4479A1' },
    { name: 'REST API', icon: 'SiPostman', color: '#FF6C37' },
  ],
  cms: [
    { name: 'WordPress', icon: 'SiWordpress', color: '#21759B' },
    { name: 'Elementor', icon: 'SiElementor', color: '#92003B' },
    { name: 'WooCommerce', icon: 'SiWoocommerce', color: '#96588A' },
  ],
  tools: [
    { name: 'n8n', icon: 'SiN8N', color: '#EA4B71' },
    { name: 'Git', icon: 'SiGit', color: '#F05032' },
    { name: 'VPS/CloudPanel', icon: 'SiLinux', color: '#FCC624' },
    { name: 'Google Ads', icon: 'SiGoogleads', color: '#4285F4' },
    { name: 'SEO', icon: 'SiGooglesearchconsole', color: '#458CF5' },
  ],
};

// Array datar untuk logo loop
export const allTechLogos = [
  ...stackData.frontend,
  ...stackData.backend,
  ...stackData.cms,
  ...stackData.tools,
];
