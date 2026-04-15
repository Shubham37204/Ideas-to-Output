export default function TextAreaInput({
    label,
    value,
    onChange,
    placeholder,
    disabled = false,
    maxLength,
    className = "h-24",
    showCounter = false,
    description
}) {
    const charCount = value?.length || 0;
    const isNearLimit = maxLength && charCount > maxLength * 0.85;

    return (
        <div className="flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-slate-900">
                    {label}
                </label>
                {showCounter && maxLength && (
                    <span className={`text-xs font-medium ${isNearLimit ? 'text-orange-600' : 'text-slate-500'}`}>
                        {charCount}/{maxLength}
                    </span>
                )}
            </div>
            {description && (
                <p className="text-xs text-slate-500 mb-2">{description}</p>
            )}
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full ${className} px-4 py-3 text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-300`}
                disabled={disabled}
                maxLength={maxLength}
            />
        </div>
    );
}