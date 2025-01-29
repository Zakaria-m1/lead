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
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Activity
      </h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index} className="flex items-center mb-2">
            <span className={`mr-2 ${activity.color}`}>{activity.icon}</span>
            <p className="text-gray-600">{activity.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
