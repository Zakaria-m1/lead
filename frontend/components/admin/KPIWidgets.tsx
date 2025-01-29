import KPIWidget from "./KPIWidget";

interface KPIWidget {
  title: string;
  value: string;
  icon: string;
  color: string;
  onClick?: () => void; // Optional onClick for each widget
}

interface Props {
  widgets: KPIWidget[];
}

const KPIWidgets: React.FC<Props> = ({ widgets }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {widgets.map((widget, index) => (
        <KPIWidget
          key={index}
          title={widget.title}
          value={widget.value}
          icon={widget.icon}
          color={widget.color}
          onClick={widget.onClick} // Pass the onClick handler if it exists
        />
      ))}
    </div>
  );
};

export default KPIWidgets;
