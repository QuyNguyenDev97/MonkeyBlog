import React from "react";

const HomeSlogen = () => {
  return (
    <div className="container !mb-20">
      <div className="mb-20 text-center">
        <h2 className="mb-5 text-lg font-bold uppercase text-primary">
          OWN YOUR CONTENT
        </h2>
        <p className="mb-10 text-5xl font-extrabold sm:text-3xl">
          No Ads. No Paywall.{" "}
          <span className="text-secondary">No Kidding.</span>
        </p>
      </div>
      <div className="flex lg:flex-col gap-x-5 sm:gap-y-5">
        <div className="px-10 py-5 shadow-xl bg-pink-50 rounded-xl">
          <div className="w-[160px] h-[180px]">
            <img
              className="w-full h-full"
              src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1643286673231%2FWuDnrjhoX.png%3Fauto%3Dcompress&w=1920&q=75"
              alt="icon"
            />
          </div>
          <h2 className="mb-5 text-3xl font-bold sm:text-2xl">
            Blog on your personal domain
          </h2>
          <p className="">
            Map your custom domain in just seconds. Serve your blog over HTTPS
            with no extra configuration. Get a high performance, secure, and
            fully-optimized dev blog that delights your readers.
          </p>
        </div>
        <div className="px-10 py-5 shadow-xl bg-pink-50 rounded-xl">
          <div className="w-[160px] h-[180px]">
            <img
              className="w-full h-full"
              src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1643286976832%2FPZ6-e1Da2.png%3Fauto%3Dcompress&w=1920&q=75"
              alt="icon"
            />
          </div>
          <h2 className="mb-5 text-3xl font-bold sm:text-2xl">
            Instantly find your audience
          </h2>
          <p className="">
            Every time you write an article, Hashnode publishes it on your
            domain and shares it with the dev community members on the homepage.
            The readers are directed to your website to read and interact with
            your content.
          </p>
        </div>
        <div className="px-10 py-5 shadow-xl bg-pink-50 rounded-xl">
          <div className="w-[160px] h-[180px]">
            <img
              className="w-full h-full"
              alt="icon"
              src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1643286986603%2FovWZjIV-n.png%3Fauto%3Dcompress&w=1920&q=75"
            />
          </div>
          <h2 className="mb-5 text-3xl font-bold sm:text-2xl">
            No annoying ads/pop-ups
          </h2>
          <p className="">
            Knowledge sharing on Hashnode is and will always be completely free.
            Because we value the relationship between you and your readers, we
            won't show ads or pop-ups on your articles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSlogen;
