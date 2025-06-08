import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { forwardRef, useState } from 'react';

export const PasswordInput = forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                type={showPassword ? 'text' : 'password'}
                className={className}
                ref={ref}
                {...props}
            />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ? (
                    <IconEye className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <IconEyeOff className="h-4 w-4 text-muted-foreground" />
                )}
            </Button>
        </div>
    );
});

PasswordInput.displayName = 'PasswordInput';
