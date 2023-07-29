"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-5/6 lg:w-4/6 mx-auto">
      <div className="flex flex-row justify-center items-center h-[80vh]">
        <div className="text-center">
          <h2 className="text-xl mb-5">Something went wrong!</h2>
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Please Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
