import Link from "next/link";
import { PRICE, Cuisine, Location, Review } from "@prisma/client";
import Price from "@/app/components/Price";
import Rating from "./Rating";

interface RestaurantProps {
    id: number;
    name: string;
    main_image: string;
    price: PRICE;
    cuisine: Cuisine;
    location: Location;
    slug: string;
    reviews: Review[]
}

export default function RestaurantCard({ restaurant }: { restaurant: RestaurantProps }) {
    return (
        <div className="border-b flex pb-5 ml-4">

            <img
                src={restaurant.main_image}
                alt=""
                className="h-36 w-44 rounded"
            />
            <div className="pl-5">
                <h2 className="text-3xl">{restaurant.name}</h2>
                <div className="flex items-start">
                    <Rating reviews={restaurant.reviews} />
                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <Price price={restaurant.price} />
                        <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
                        <p className="mr-4 capitalize">{restaurant.location.name}</p>
                    </div>
                </div>
                <div className="text-red-600">
                    <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
                </div>
            </div>
        </div>
    )
}