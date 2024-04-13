import Stars from "@/app/components/Stars";
import { calculateReviewRationgAvg, renderReviewRatingText } from "@/utils/calculateReviewRatingAverage";
import { Review } from "@prisma/client"

interface ReviewProp {
    reviews: Review[]
}

export default function Rating({ reviews }: ReviewProp) {
    const reviewStatus = renderReviewRatingText(reviews);

    return (
        <>
            {<Stars reviews={reviews} />}
            <p className="ml-2 text-sm">{reviewStatus}</p>
        </>
    )
}
