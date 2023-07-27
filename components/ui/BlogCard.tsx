/* eslint-disable @next/next/no-img-element */
import React from "react";

const BlogCard = () => {
  return (
    <article className="cursor-pointer flex max-w-xl flex-col items-start justify-between">
      <div className="group relative">
        <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2    dark:text-white">
          <a href="/post/architectural-engineering-wonders-of-the-modern-era-for-your-inspiration">
            <span className="bg-gradient-to-r from-purple-200 to-purple-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
              Earum textilis annus dolores sursum demoror suasoria
            </span>
          </a>
        </h2>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {/* {post.description} */}
          Adimpleo avoco custodia. Cum consequatur ipsam. Vomer denuo trepide.
          Expedita alius somnus. Damno cunctatio ad. Facere vilitas adeptio.
          Terra sed ut. Curis concedo desparatus. Arcesso adeptio brevis.
          Apparatus universe benevolentia. Desolo quisquam viscus. Vulnus
          aliquid cuius. Voluptatem tergeo damno.
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img alt="" className="h-10 w-10 rounded-full bg-gray-400" />

        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a>
              <span className="absolute inset-0" />
              {/* {post.author.name} */}
              User 3944168
            </a>
          </p>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
