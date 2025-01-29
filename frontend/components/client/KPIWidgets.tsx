interface KPIWidgetProps {
  title: string;
  value: string;
  icon: string;
  color: string;
}

const KPIWidget: React.FC<KPIWidgetProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
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

interface Props {
  widgets: KPIWidgetProps[];
}

const KPIWidgets: React.FC<Props> = ({ widgets }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {widgets.map((widget, index) => (
        <KPIWidget key={index} {...widget} />
      ))}
    </div>
  );
};

export default KPIWidgets;
