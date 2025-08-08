import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonCard = () => (
    <div className="card">
        <Skeleton height={280} />
        <div className="card-content">
            <h2><Skeleton /></h2>
            <p><Skeleton count={2} /></p>
        </div>
    </div>
);