import { MDXRemote } from 'next-mdx-remote/rsc';

interface MdxRendererProps {
  source: string;
}

export function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <div className="prose">
      <MDXRemote source={source} />
    </div>
  );
}
