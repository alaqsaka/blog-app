import BlogCard from "@/components/ui/BlogCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const blogs = Array(20).fill({
    id: 56561,
    user_id: 3944168,
    title: "Earum textilis annus dolores sursum demoror suasoria.",
    body: "Adimpleo avoco custodia. Cum consequatur ipsam. Vomer denuo trepide. Expedita alius somnus. Damno cunctatio ad. Facere vilitas adeptio. Terra sed ut. Curis concedo desparatus. Arcesso adeptio brevis. Apparatus universe benevolentia. Desolo quisquam viscus. Vulnus aliquid cuius. Voluptatem tergeo damno.",
  });

  return (
    <div className="w-4/6 mx-auto">
      <div className="mx-auto grid mt-10 max-w-2xl grid-cols-1 gap-x-8 gap-y-16  lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard data={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
}
