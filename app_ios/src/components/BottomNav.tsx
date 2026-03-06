type Tab = 'habits' | 'quotes' | 'journal' | 'goals' | 'calendar';

export function BottomNav({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  const tabs: Tab[] = ['habits', 'quotes', 'journal', 'goals', 'calendar'];

  return (
    <nav style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #ddd' }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{ fontWeight: activeTab === tab ? 700 : 400 }}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
