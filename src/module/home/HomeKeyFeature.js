import React from "react";
import Button from "../../component/button/Button";

const HomeKeyFeature = () => {
  return (
    <div className="container !mb-20 ">
      <div className="p-10 mb-20 text-white  bg-[#111827] rounded-lg ">
        <div className="flex mb-20">
          <div className="w-1/2 sm:w-full">
            <h1 className="mb-5 text-base font-medium uppercase text-primary">
              KEY FEATURES
            </h1>
            <p className="text-5xl font-extrabold text-white sm:text-xl">
              Everything you need to start blogging as a developer!
            </p>
          </div>
          <div className="w-1/2 sm:hidden">
            <div className="ml-auto  w-[200px] h-[200px]">
              <img
                src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1643362175006%2FIgPo-NlO9.png%3Fauto%3Dcompress&w=1920&q=75"
                alt="icon"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-1">
          <div className="flex p-20 sm:p-5 gap-x-5">
            <div className="text-4xl text-violet-400">
              <i className="fa-brands fa-github"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold">Automatic GitHub Backup</h2>
              <p>
                Every time you publish an article on your tech blog, a markdown
                version of the post is pushed to your private GitHub repo as a
                backup.
              </p>
            </div>
          </div>
          <div className="flex p-20 sm:p-5 gap-x-5">
            <div className="text-4xl text-red-400">
              <i className="fa-solid fa-star-half-stroke"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold">Write in Markdown</h2>
              <p>
                Write your content in a distraction-free Markdown editor with
                proper syntax highlighting and see live previews instantly.
                Embed images, code snippets, tweets, and much more.
              </p>
            </div>
          </div>
          <div className="flex p-20 sm:p-5 gap-x-5">
            <div className="text-4xl text-green-400">
              <i className="fa-solid fa-earth-americas"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold">Map a custom domain</h2>
              <p>
                Bring your custom domain, and get up and running within minutes.
                We issue, and renew SSL cert for you automatically.
              </p>
            </div>
          </div>
          <div className="flex p-20 sm:p-5 gap-x-5">
            <div className="text-4xl text-yellow-400">
              <i className="fa-solid fa-bolt-lightning"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold">Automatic GitHub Backup</h2>
              <p>
                Every time you publish an article on your tech blog, a markdown
                version of the post is pushed to your private GitHub repo as a
                backup.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center p-10 rounded-lg shadow-xl sm:gap-y-5 sm:text-center sm:items-center sm:justify-center sm:flex-col sm:p-5 bg-violet-200">
        <div>
          <h2 className="mb-5 text-3xl font-bold">
            Join a growing dev community of millions of active developers!
          </h2>
          <p className="mb-5 text-lg">
            Millions of tech blogs publish on Hashnode daily. Be a part of an
            active community of developers, tech enthusiasts and creators. Blog
            on your personal domain, share ideas, and connect with the global
            tech community.
          </p>
          <div className="flex sm:justify-center gap-x-5">
            <Button
              className="!w-[150px] sm:!w-[120px]"
              type="button"
              to="/sign-up"
              hasBorder="border-2 border-green-400 rounded-lg"
            >
              Get Started
            </Button>
            <Button
              type="button"
              className="!w-[150px] sm:!w-[120px] !bg-none border-2  !border-primary !text-primary"
              hasBorder="border-2 border-primary rounded-lg"
              to="/sign-in"
            >
              Sign In
            </Button>
          </div>
        </div>
        <div>
          <div>
            <img
              src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1643394967065%2FpOn8uxJFD.png%3Fauto%3Dcompress&w=1920&q=75"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeKeyFeature;
