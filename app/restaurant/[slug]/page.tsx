import prisma from "@/utils/prisma";
import { Review } from '@prisma/client';
import { notFound } from 'next/navigation';
import Description from "./components/Description";
import Image from "./components/Image";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";


interface Restaurant {
    id: string;
    name: string;
    slug: string;
    images: string[];
    description: string;
    reviews: Review[]
}

const fetchRestaurantsBySlug = async (slug: string): Promise<Restaurant> => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true,
            reviews: true,
        }
    })

    if (!restaurant)
        //Whenever it get called, it'll trigger the not-found.tsx file
        notFound();

    return restaurant;
}

export default async function RestaurantDetails({ params }: { params: { slug: string } }) {

    const restaurant = await fetchRestaurantsBySlug(params.slug);

    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                <RestaurantNavBar slug={restaurant.slug} />
                <Title name={restaurant.name} />
                <Rating reviews={restaurant.reviews} />
                <Description description={restaurant.description} />
                <Image images={restaurant.images} />
                <Reviews reviews={restaurant.reviews} />
            </div>
            <div className="w-[27%] relative text-reg">
                <ReservationCard />
            </div>
        </>
    )
}