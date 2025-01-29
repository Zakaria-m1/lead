import React from "react";

interface Activity {
  message: string;
  icon: string;
  color: string;
}

interface Props {
  activities: Activity[];
}

const RecentActivity: React.FC<Props> = ({ activities }) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Activity
      </h2>
      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-center">
            <span className={`mr-2 ${activity.color}`}>{activity.icon}</span>
            {activity.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
