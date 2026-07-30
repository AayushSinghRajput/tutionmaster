const formatLabel = (item) =>
    item.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const QuickNav = ({ items }) => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-white text-lg font-semibold mb-4">Quick Navigation</h2>
            <div className="flex flex-wrap gap-4">
                {items.map((item) => (
                    <a

                        key={item}
                        href={`#${item}`}
                        className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
                    >
                        {formatLabel(item)}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default QuickNav;