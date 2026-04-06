import { normalizeError } from "../schemas";

type FieldErrorProps = {
  errors: unknown[];
};

export function FieldError({ errors }: FieldErrorProps) {
  if (errors.length === 0) {
    return null;
  }

  return <p className="mt-1 text-xs text-red-700">{normalizeError(errors[0])}</p>;
}
