"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  console.log(error);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
    </div>
  );
}
