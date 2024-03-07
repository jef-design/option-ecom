import Rating from "@mui/material/Rating";

interface Props {
    reviews: any;
}
const Reviews = ({reviews}: Props) => {
   

    const formatDate = (date:any) => {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          return formattedDate
    }

    return (
        <div className="mt-5">
            <h2 className="font-bold text-xl mb-3">
                ({reviews.length})Reviews {!reviews.length && <span className="text-gray-400">(No reviews yet)</span>}
            </h2>
            {reviews.map((review: any, index: any) => {
                return (
                    <div className="px-3 py-2 border rounded-md my-2" key={index}>
                        <div className="flex items-center gap-2">
                        <div>{review.userId?.name}</div><Rating name="read-only" value={review.star} readOnly />
                        </div>
                        <div>
                          {review.comment}
                        </div>
                        <span>{formatDate(review.date)}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default Reviews;
