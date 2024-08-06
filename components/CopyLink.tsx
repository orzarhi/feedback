'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';

export const CopyLink = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <Button size="icon" variant="link" onClick={copyToClipboard}>
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </Button>
  );
};
