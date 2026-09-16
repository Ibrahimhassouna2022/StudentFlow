
import Link from "next/link";
export default function CardResources({
    title,
    description,
    tag,
    minutes,
    author,
    url,
}) {

    return (
        <div className="flex flex-col gap-5 w-full border bg-white border-slate-200 shadow rounded-xl py-6 px-5">
            <div className="flex justify-between items-center ">
                <span className=" px-2 py-0.5 rounded-full text-[11px] bg-red-300/23 ">{tag} </span>
                <span className="px-2 py-0.5 text-white-588  text-sm "> ⏱️ {minutes}  min read</span>
            </div>

            <h1 className="font-extrabold text-md  ">{title}

            </h1>
            <p className="text-sm line-clamp-2">{description}</p>


            <div className="border-slate-300  border-b h-[1px] w-full" />

            <div className="flex justify-between items-center ">

                <span className="px-2 py-0.5 text-white-588  text-sm ">{author}</span>
                <Link href={url} target="_blank"
                    className=" px-3 py-2 rounded-lg text-sm font-bold bg-red-300/23 ">
                    Read Article  ↗</Link>
            </div>
        </div>
    );
}