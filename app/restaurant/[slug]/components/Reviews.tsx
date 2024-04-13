import Stars from "@/app/components/Stars";
import { PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Reviews({ reviews }: { reviews: Review[] }) {

    return (
        <div>
            {reviews.length > 0 && <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                What 100 people are saying
            </h1>}
            <div>
                {/* REVIEW CARD */}
                {reviews.map(({ first_name, last_name, text, rating }, index) => (
                    <div className="border-b pb-7 mb-7" key={index}>
                        <div className="flex">
                            <div className="w-1/6 flex flex-col items-center">
                                <div
                                    className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center"
                                >
                                    <h2 className="text-white text-2xl uppercase">{`${first_name.slice(0, 1)}${last_name.slice(0, 1)}`}</h2>
                                </div>
                                <p className="text-center">{`${first_name} ${last_name}`}</p>
                            </div>
                            <div className="ml-10 w-5/6">
                                <div className="flex items-center">
                                    <div className="flex mr-5"><Stars rating={rating} reviews={[]} /></div>
                                </div>
                                <div className="mt-5">
                                    <p className="text-lg font-light">
                                        {text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* REVIEW CARD */}
            </div>
        </div>

    )
}
