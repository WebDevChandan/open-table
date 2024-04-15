import prisma from "@/utils/prisma";
import { PRICE } from '@prisma/client';
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";


export interface SearchParams { city?: string, cuisine?: string, price?: PRICE }

const fetchRestaurantByLocation = (searchParams: SearchParams) => {
    const where: any = {};

    if (searchParams.city) {
        const location = {
            name: {
                equals: searchParams.city.toLowerCase(),
            }
        }
        where.location = location;
    }
    if (searchParams.cuisine) {
        const cuisine = {
            name: {
                equals: searchParams.cuisine.toLowerCase(),
            }
        }
        where.cuisine = cuisine;
    }
    if (searchParams.price) {
        const price = {
            equals: searchParams.price,
        }
        where.price = price;
    }


    const select = {
        id: true,
        name: true,
        main_image: true,
        price: true,
        cuisine: true,
        location: true,
        slug: true,
        reviews: true,
    }

    return prisma.restaurant.findMany({
        where,
        select,

    })
}

const fetchLocation = async () => {
    const location = await prisma.location.findMany({
        select: {
            id: true,
            name: true,
        }
    });
    return location;
}

const fetchCuisine = async () => {
    const cuisine = await prisma.cuisine.findMany({
        select: {
            id: true,
            name: true,
        }
    });
    return cuisine;
}
export default async function Search({ searchParams }: { searchParams: SearchParams }) {
    const restaurants = await fetchRestaurantByLocation(searchParams);

    const location = await fetchLocation();
    const cuisine = await fetchCuisine();

    return (
        <>
            <Header />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar locations={location} cuisines={cuisine} searchParams={searchParams} />

                <div className="w-5/6">
                    {
                        restaurants.length ?
                            restaurants.map(restaurant => (
                                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                            )) :
                            <p>Sorry, We don't found any Restaurant in this Area.</p>
                    }

                </div>
            </div>
        </>
    )
}