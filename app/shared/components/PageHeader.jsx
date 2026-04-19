export default function PageHeader({ icon, title, subtitle, accentColor = '#5b6ef5' }) {
    return (
        <div className="mb-10 space-y-3">
            <div className="flex items-center gap-3">
                {icon && (
                    <div
                        className="p-2.5 rounded-xl"
                        style={{ background: accentColor + '18' }}
                    >
                        {icon}
                    </div>
                )}
                <div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">{subtitle}</p>
                    )}
                </div>
            </div>
            {/* accent underline */}
            <div className="h-0.5 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
        </div>
    );
}