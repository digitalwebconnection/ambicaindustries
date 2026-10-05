import { AlertCircle } from 'lucide-react';

interface FieldErrorProps {
  error?: string | null;
  id?: string;
}

export default function FieldError({ error, id }: FieldErrorProps) {
  if (!error) return null;

  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1.5"
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
      <span>{error}</span>
    </p>
  );
}
