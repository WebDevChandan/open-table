import Link from "next/link";
import { PRICE } from '@prisma/client';
import { SearchParams } from "../page";


interface LocationCuisineProp {
    id: number;
    name: string;
}

export default function SearchSideBar({ locations, cuisines, searchParams }: { locations: LocationCuisineProp[], cuisines: LocationCuisineProp[], searchParams: SearchParams}) {

    const prices = [{
        price: PRICE.CHEAP,
        label: "$$",
        className: "border w-full text-reg font-light rounded-l p-2 text-center",
    },
    {
        price: PRICE.REGULAR,
        label: "$$$",
        className: "border-r border-t border-b w-full text-reg font-light p-2 text-center",
    },
    {
        price: PRICE.EXPENSIVE,
        label: "$$$$",
        className: "border-r border-t border-b w-full text-reg font-light p-2 rounded-r text-center",
    }]

    return (
        <div className="w-1/5">
            <div className="border-b pb-4 flex flex-col">
                <h1 className="mb-2">Region</h1>
                {
                    locations.map(location => (
                        <Link
                            href={{
                                pathname: "/search",
                                query: {
                                    ...searchParams,
                                    city: location.name
                                }
                            }}
                            className="font-light text-reg capitalize cursor-pointer" key={location.id}>
                            {location.name}
                        </Link>
                    ))
                }
            </div>
            <div className="border-b pb-4 mt-3 flex flex-col">
                <h1 className="mb-2">Cuisine</h1>
                {
                    cuisines.map(cuisine => (
                        <Link
                            href={{
                                pathname: "/search",
                                query: {
                                    ...searchParams,
                                    cuisine: cuisine.name
                                }
                            }}
                            className="font-light text-reg capitalize cursor-pointer" key={cuisine.id}>
                            {cuisine.name}
                        </Link>
                    ))
                }
            </div>
            <div className="mt-3 pb-4">
                <h1 className="mb-2">Price</h1>
                <div className="flex">
                    {prices.map(({price, label, className}) => (
                        <Link
                            href={{
                                pathname: "/search",
                                query: {
                                    ...searchParams,
                                    price: price
                                }
                            }}
                            className={className}>
                            {label}
                        </Link> 
                    ))}
                </div>
            </div>
        </div>
    )
}