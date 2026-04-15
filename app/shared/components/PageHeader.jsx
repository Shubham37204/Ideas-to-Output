export default function PageHeader({ icon, title, subtitle }) {
    return (
        <div className="text-center mb-12 space-y-4">
            <div className="flex items-center justify-center gap-3">
                {icon && (
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                        {icon}
                    </div>
                )}
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                    {title}
                </h1>
            </div>
            {subtitle && (
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
}