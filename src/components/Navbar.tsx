"use client";
import { Film, Folder, Projector, Tv } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "motion/react";
import SearchInput from "./SearchInput";
import {
  Bitcount,
  Bitcount_Single,
  Quintessential,
  Sniglet,
} from "next/font/google";

const bitCount = Sniglet({
  subsets: ["latin"],
  weight: "400",
});
export const Navbar = () => {
  // const navItems = [
  //   {
  //     title: "Movie",
  //     href: "/Movie",
  //     logo: <Film className="size-5 mt-1 text-neutral-100 z-10" />,
  //   },

  //   {
  //     title: "Tv Shows",
  //     href: "/projects",
  //     logo: <Tv className="size-5 mt-1 text-neutral-100 z-10" />,
  //   },

  //   {
  //     title: "Categories",
  //     href: "/categories",
  //     logo: <Folder className="size-5 mt-1 text-neutral-100 z-10" />,
  //   },
  // ];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <nav className="fixed left-0 top-0 w-full shadow-sm bg-black/50 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 p-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="p-2 bg-green-600 w-8 h-8 inline-block rounded-full">
            <span className="relative w-full h-full bg-white animate-pulse block rounded-md"></span>
          </span>
          <span
            className={`text-4xl  font-medium text-zinc-200 ${bitCount.className} max-md:text-sm`}
          >
            Thea
          </span>
        </Link>
        {/* <div className="flex items-center gap-x-2 ml-4">
          {navItems.map((item, idx) => (
            <Link
              className="text-sm relative px-2 py-1"
              href={item.href}
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === idx && (
                <motion.span
                  layoutId="hovered-span"
                  className="h-full w-full absolute inset-0 rounded-md bg-neutral-900 z-10"
                />
              )}
              <div className="flex gap-x-2 items-center ">
                {item.logo}
                <span className="z-50 text-neutral-200 text-md tracking-tight font-bold pt-2">
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div> */}
        <SearchInput />
      </div>
    </nav>
  );
};

// "use client";
// import { Film, Folder, Tv } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { motion } from "motion/react";
// import SearchInput from "./SearchInput";

// export const Navbar = () => {
//   const navItems = [
//     {
//       title: "Movie",
//       href: "/Movie",
//       logo: <Film className="size-5 mt-1 text-neutral-100 z-10" />,
//     },

//     {
//       title: "Tv Shows",
//       href: "/projects",
//       logo: <Tv className="size-5 mt-1 text-neutral-100 z-10" />,
//     },

//     {
//       title: "Categories",
//       href: "/categories",
//       logo: <Folder className="size-5 mt-1 text-neutral-100 z-10" />,
//     },
//   ];
//   const [hovered, setHovered] = useState<number | null>(null);

//   return (
//     <nav className="fixed left-0 top-0 w-full shadow-sm bg-black/50 z-50">
//       <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 p-3">
//         <Link href="/" className="flex items-center gap-2">
//           <Film className="size-8 text-neutral-200" />
//           <span className="text-[17px] font-extrabold tracking-tight text-zinc-200 max-md:text-sm">
//             Theatre
//           </span>
//         </Link>
//         <div className="flex items-center gap-x-2">
//           {navItems.map((item, idx) => (
//             <Link
//               className="text-sm relative px-2 py-1"
//               href={item.href}
//               key={idx}
//               onMouseEnter={() => setHovered(idx)}
//               onMouseLeave={() => setHovered(null)}
//             >
//               {hovered === idx && (
//                 <motion.span
//                   layoutId="hovered-span"
//                   className="h-full w-full absolute inset-0 rounded-md bg-neutral-900 z-10"
//                 />
//               )}
//               <div className="flex gap-x-2 items-center ">
//                 {item.logo}
//                 <span className="z-50 text-neutral-200 text-md tracking-tight font-bold pt-2">
//                   {item.title}
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>
//         <SearchInput />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
