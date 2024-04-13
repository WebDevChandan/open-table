import { Review } from "@prisma/client";

export const calculateReviewRationgAvg = (reviews: Review[]): number => {
    let reviewCount = 0;

    reviews.map((review) => {
        reviewCount += review.rating
    })

    const avgOfReview = reviewCount / reviews.length;
    
    
    return avgOfReview;
}

export const renderReviewRatingText = (reviews: Review[]): string => {
    const avgOfReview = calculateReviewRationgAvg(reviews);

    if (!avgOfReview) return "No Reviews";

    if (avgOfReview < 2) return "Average";

    else if (avgOfReview > 3) return "awesome";

    else return "Good";
}