import { Icons } from '@/components/icons/icons';

const HotCampaignBadge = () => (
  <div className="absolute top-3 right-3 z-10">
    <div className="relative flex items-center gap-1 bg-gradient-to-r from-orange-400 via-red-500 to-red-700 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
      <div className="relative">
        <Icons.flame
          className="h-4 w-4 animate-pulse drop-shadow-[0_0_2px_white]"
          style={{
            fill: 'url(#flame-gradient)',
            stroke: 'url(#flame-gradient)',
            filter: 'drop-shadow(0 0 2px #fff)',
          }}
        />
        <svg width="0" height="0">
          <defs>
            <linearGradient id="flame-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fffbe6" />
              <stop offset="40%" stopColor="#FFD700" />
              <stop offset="80%" stopColor="#FF9800" />
              <stop offset="100%" stopColor="#F44336" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 animate-ping">
          <Icons.flame
            className="h-4 w-4 opacity-40"
            style={{
              fill: 'url(#flame-gradient)',
              stroke: 'url(#flame-gradient)',
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default HotCampaignBadge;
