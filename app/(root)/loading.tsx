import LoadingSkeleton from "@/components/ui/loading-skeleton-blog";
import React from "react";

const Loading = () => {
  let arrays = Array.from({ length: 20 }, (e, i) => i);
  return (
    <div className="w-5/6 lg:w-4/6 mx-auto">
      <div className="mx-auto grid mt-10 max-w-2xl grid-cols-1 gap-x-8 gap-y-16  lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {arrays.map((array, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
