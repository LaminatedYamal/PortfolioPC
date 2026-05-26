import StudioClient from './StudioClient';

// Required for Next.js static export (`output: 'export'`).
export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <StudioClient />;
}
