import fullStar from '../../public/icons/full-star.svg';
import halfStar from '../../public/icons/half-star.svg';
import emptyStar from '../../public/icons/empty-star.svg';
import Image from 'next/image';
import { Review } from '@prisma/client';
import { calculateReviewRationgAvg } from '@/utils/calculateReviewRatingAverage';

export default function Stars({ reviews, rating }: { reviews: Review[], rating?: number }) {
    const reviewRating = rating || calculateReviewRationgAvg(reviews);

    const renderStars = () => {
        const stars = [];

        for (let i = 0; i < 5; i++) {
            const difference = parseFloat((reviewRating - i).toFixed(1));

            //Handling single Digit star rating 1 to 5
            if (difference >= 1) stars.push(fullStar);
                
            //Handling point star ratings (ex: 0.2, 0.5, 0.7)
            else if (difference < 1 && difference > 0) {
                if (difference <= 0.2) stars.push(emptyStar);
                else if (difference > 0.2 && difference <= 0.6) stars.push(halfStar)
                else stars.push(fullStar);
            }
                
            //Handling 0 star ratings
            else stars.push(emptyStar);
        }

        return stars.map(img => {
            return (
                <img src={img.src} alt={`stars icon`} className='w-4 h-4 mr-1' />
            )
        })
    }

    return <div className="flex items-center">{renderStars()}</div>
}
