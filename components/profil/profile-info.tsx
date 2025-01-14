import { ProfileData } from '@/ts/profile';
import Image from 'next/image';

export default function ProfileInfo({ data }: { data: ProfileData }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        {data.profile.avatar && (
          <div className="relative w-20 h-20">
            <Image
              src={data.profile.avatar}
              alt={data.username}
              fill
              className="rounded-full object-cover"
              sizes="(max-width: 80px) 100vw, 80px"
            />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">{data.username}</h1>
          <p className="text-gray-600">{data.email}</p>
        </div>
      </div>

      {data.profile.bio && <p className="mt-4 text-gray-700">{data.profile.bio}</p>}

      <div className="mt-6 flex space-x-4">
        <div className="text-center">
          <div className="font-bold">{data._count.articles}</div>
          <div className="text-gray-600">Articles</div>
        </div>
        <div className="text-center">
          <div className="font-bold">{data._count.comments}</div>
          <div className="text-gray-600">Comments</div>
        </div>
        <div className="text-center">
          <div className="font-bold">{data._count.likes}</div>
          <div className="text-gray-600">Likes</div>
        </div>
      </div>
    </div>
  );
}
