import { useEffect, useRef, type ReactNode } from "react"

interface DialogProps {
    maxWidth?: "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl",
    children?: ReactNode,
    dialogTitle?: string,
    dialogActions?: ReactNode,
    open?: boolean,
    onClose?: () => void,
    disableEscapeKeyDown?: boolean //action du curseur
}

export const Dialog = ({ maxWidth = "md", children, dialogTitle, dialogActions, open, onClose, disableEscapeKeyDown = false }: DialogProps) => {
    const maxWidthClasses = {
        '3xs': 'max-w-3xs',
        '2xs': 'max-w-2xs',
        'xs': 'max-w-xs',
        'sm': 'max-w-sm',
        'md': 'max-w-md',
        'lg': 'max-w-lg',
        'xl': 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
    }
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open || disableEscapeKeyDown) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) onClose?.();
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, disableEscapeKeyDown, onClose]);

    if(!open) return null
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" />
            <div
                ref={dialogRef} 
                className={`relative ${maxWidthClasses[maxWidth]} w-full bg-white rounded-lg shadow-xl overflow-hidden`}
            >
                <div className="flex justify-end pr-2.75 pt-0.5">
                    <button 
                        className="font-bold text-[20px] cursor-pointer" 
                        onClick={onClose}
                    >
                        x
                    </button>
                </div>

                {dialogTitle && (
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {dialogTitle}
                        </h2>
                    </div>
                )}

                <div className="px-6 py-4">{children}</div>

                {dialogActions && (
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                        {dialogActions}
                    </div>
                )}
            </div>
        </div>
    )
}