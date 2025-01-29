interface KPIWidgetProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  onClick?: () => void; // Add an optional onClick prop
}

const KPIWidget: React.FC<KPIWidgetProps> = ({
  title,
  value,
  icon,
  color,
  onClick,
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow p-6 flex items-center cursor-pointer"
      onClick={onClick} // Attach onClick handler
    >
      <div className={`p-3 ${color} rounded-full text-white text-2xl`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default KPIWidget;
